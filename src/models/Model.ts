import {
  GetRepository,
  IFireOrmQueryLine,
  IFirestoreVal,
  IOrderByParams,
  IEntity,
  IQueryBuilder,
} from "fireorm";
import {
  Arg,
  ClassType,
  Mutation,
  Query,
  Resolver,
  Authorized,
  Ctx,
} from "type-graphql";
import { firestore } from "firebase-admin";
import * as pluralize from "pluralize";
import { isValid, parseISO } from "date-fns";
import ListQueryInput from "../inputs/listQuery";

/**
 * Add capitalization on the first letter of a string
 * @param str The string being capped
 */
function capFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Remove capitalization of the first letter of a string
 * @param str The string being uncapped
 */
function uncapFirstLetter(str: string) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

/**
 * Create basic CRUD functionality with resolvers
 * @param suffix The name of the model
 * @param returnType The model types
 * @param model The actual model class
 * @param inputType The input types
 */
function createResolver<T extends ClassType>(options: {
  modelName: string;
  collectionName: string;
  returnType: T;
  model: any;
  inputType: any;
  editType: any;
  listQueryInputType: any;
  findQueryName: string;
  listQueryName: string;
  addMutationName: string;
  editMutationName: string;
  deleteMutationName: string;
  authFind: string[];
  authList: string[];
  authRead: string[];
  authWrite: string[];
  authUpdate: string[];
  authCreate: string[];
  authDelete: string[];
}) {
  const hookOptions = { type: "graphql" };
  if (options.inputType) {
    @Resolver((of) => options.returnType)
    class CrudResolver {
      @Authorized(
        options.authFind
          ? options.authFind
          : options.authRead
          ? options.authRead
          : []
      )
      @Query((returns) => options.returnType, {
        nullable: true,
        description: `Get a specific ${options.modelName} document from the ${options.collectionName} collection.`,
      })
      async [options.findQueryName
        ? options.findQueryName
        : `${uncapFirstLetter(options.modelName)}`](
        @Arg("id") id: string,
        @Ctx() context?: any
      ): Promise<T> {
        if (
          options.model.onAuth &&
          typeof options.model.onAuth === "function" &&
          !(await options.model.onAuth(
            "find",
            {
              id,
            },
            {
              ...hookOptions,
              context,
            }
          ))
        )
          return null;
        const doc =
          options.model.onBeforeFind &&
          typeof options.model.onBeforeFind === "function"
            ? await options.model.onBeforeFind(id, { ...hookOptions, context })
            : await options.model.find(id);
        return options.model.onAfterFind &&
          typeof options.model.onAfterFind === "function"
          ? await options.model.onAfterFind(doc, { ...hookOptions, context })
          : doc;
      }

      @Authorized(
        options.authList
          ? options.authList
          : options.authRead
          ? options.authRead
          : []
      )
      @Query((returns) => [options.returnType], {
        nullable: true,
        description: `Get a list of ${options.modelName} documents from the ${options.collectionName} collection.`,
      })
      async [options.listQueryName
        ? options.listQueryName
        : `${uncapFirstLetter(options.collectionName)}`](
        @Arg(
          "data",
          () =>
            options.listQueryInputType
              ? options.listQueryInputType
              : ListQueryInput,
          { nullable: true }
        )
        data?: any,
        @Ctx() context?: any
      ): Promise<any[]> {
        if (
          options.model.onAuth &&
          typeof options.model.onAuth === "function" &&
          !(await options.model.onAuth("list", data, {
            ...hookOptions,
            context,
          }))
        )
          return null;
        const docs =
          options.model.onBeforeList &&
          typeof options.model.onBeforeList === "function"
            ? await options.model.onBeforeList(data, {
                ...hookOptions,
                context,
              })
            : await options.model.paginate(data, options.model.onPaginate, {
                ...hookOptions,
                context,
              });
        return options.model.onAfterList &&
          typeof options.model.onAfterList === "function"
          ? await options.model.onAfterList(docs, {
              ...hookOptions,
              context,
              requestData: data,
            })
          : docs;
      }

      @Authorized(
        options.authCreate
          ? options.authCreate
          : options.authWrite
          ? options.authWrite
          : []
      )
      @Mutation((returns) => options.returnType)
      async [options.addMutationName
        ? options.addMutationName
        : `add${options.modelName}`](
        @Arg("data", () => options.inputType, {
          description: `Add a new ${options.modelName} document to the ${options.collectionName} collection.`,
        })
        data: any,
        @Ctx() context?: any
      ) {
        if (
          options.model.onAuth &&
          typeof options.model.onAuth === "function" &&
          !(await options.model.onAuth("add", data, {
            ...hookOptions,
            context,
          }))
        )
          return null;
        const docData =
          options.model.onBeforeAdd &&
          typeof options.model.onBeforeAdd === "function"
            ? await options.model.onBeforeAdd(data, hookOptions)
            : options.model.onBeforeWrite &&
              typeof options.model.onBeforeWrite === "function"
            ? await options.model.onBeforeWrite(data, hookOptions)
            : data;
        if (docData === false) {
          return null;
        }

        const newDoc = await options.model.create(docData);

        return options.model.onAfterAdd &&
          typeof options.model.onAfterAdd === "function"
          ? await options.model.onAfterAdd(newDoc, {
              ...hookOptions,
              requestData: data,
            })
          : options.model.onAfterWrite &&
            typeof options.model.onAfterWrite === "function"
          ? await options.model.onAfterWrite(newDoc, {
              ...hookOptions,
              requestData: data,
            })
          : newDoc;
      }

      @Authorized(
        options.authUpdate
          ? options.authUpdate
          : options.authWrite
          ? options.authWrite
          : []
      )
      @Mutation((returns) => options.returnType)
      async [options.editMutationName
        ? options.editMutationName
        : `edit${options.modelName}`](
        @Arg("id", () => String, {
          description: `The ID of the ${options.modelName} document in the ${options.collectionName} collection`,
        })
        id: string,
        @Arg(
          "data",
          () => (options.editType ? options.editType : options.inputType),
          {
            description: `Update a ${options.modelName} document in the ${options.collectionName} collection.`,
          }
        )
        data: any,
        @Ctx() context?: any
      ) {
        if (
          options.model.onAuth &&
          typeof options.model.onAuth === "function" &&
          !(await options.model.onAuth(
            "edit",
            { ...data, id },
            {
              ...hookOptions,
              context,
            }
          ))
        )
          return null;
        const docData =
          options.model.onBeforeEdit &&
          typeof options.model.onBeforeEdit === "function"
            ? await options.model.onBeforeEdit({ id, ...data }, hookOptions)
            : options.model.onBeforeWrite &&
              typeof options.model.onBeforeWrite === "function"
            ? await options.model.onBeforeWrite({ id, ...data }, hookOptions)
            : data;
        if (docData === false) {
          return null;
        }

        const doc = await options.model.update({ id, ...docData });

        return options.model.onAfterEdit &&
          typeof options.model.onAfterEdit === "function"
          ? await options.model.onAfterEdit(doc, {
              ...hookOptions,
              requestData: data,
            })
          : options.model.onAfterWrite &&
            typeof options.model.onAfterWrite === "function"
          ? await options.model.onAfterWrite(doc, {
              ...hookOptions,
              requestData: data,
            })
          : doc;
      }

      @Authorized(
        options.authDelete
          ? options.authDelete
          : options.authWrite
          ? options.authWrite
          : []
      )
      @Mutation((returns) => options.returnType)
      async [options.deleteMutationName
        ? options.deleteMutationName
        : `delete${options.modelName}`](
        @Arg("id", () => String, {
          description: `The ID of the ${options.modelName} document being deleted in the ${options.collectionName} collection`,
        })
        id: string,
        @Ctx() context?: any
      ) {
        if (
          options.model.onAuth &&
          typeof options.model.onAuth === "function" &&
          !(await options.model.onAuth(
            "list",
            { id },
            {
              ...hookOptions,
              context,
            }
          ))
        )
          return null;
        const modelBefore = await options.model.find(id);
        if (
          options.model.onBeforeDelete &&
          typeof options.model.onBeforeDelete === "function"
        ) {
          const res = await options.model.onBeforeDelete(
            {
              id,
              ...modelBefore,
            },
            hookOptions
          );
          if (res === false) {
            return { id, ...modelBefore };
          }
        }
        await options.model.delete(id);

        return options.model.onAfterDelete &&
          typeof options.model.onAfterDelete === "function"
          ? await options.model.onAfterDelete(
              { id, ...modelBefore },
              hookOptions
            )
          : { id, ...modelBefore };
      }
    }

    return CrudResolver;
  } else {
    @Resolver((of) => options.returnType)
    class BaseResolver {
      @Authorized(
        options.authFind
          ? options.authFind
          : options.authRead
          ? options.authRead
          : []
      )
      @Query((returns) => options.returnType, {
        nullable: true,
        description: `Get a specific ${options.modelName} document from the ${options.collectionName} collection.`,
      })
      async [options.findQueryName
        ? options.findQueryName
        : `${uncapFirstLetter(options.modelName)}`](
        @Arg("id") id: string,
        @Ctx() context?: any
      ): Promise<T> {
        if (
          options.model.onAuth &&
          typeof options.model.onAuth === "function" &&
          !(await options.model.onAuth(
            "find",
            {
              id,
            },
            {
              ...hookOptions,
              context,
            }
          ))
        )
          return null;
        const doc =
          options.model.onBeforeFind &&
          typeof options.model.onBeforeFind === "function"
            ? await options.model.onBeforeFind(id, { ...hookOptions, context })
            : await options.model.find(id);
        return options.model.onAfterFind &&
          typeof options.model.onAfterFind === "function"
          ? await options.model.onAfterFind(doc, { ...hookOptions, context })
          : doc;
      }

      @Authorized(
        options.authList
          ? options.authList
          : options.authRead
          ? options.authRead
          : []
      )
      @Query((returns) => [options.returnType], {
        nullable: true,
        description: `Get a list of ${options.modelName} documents from the ${options.collectionName} collection.`,
      })
      async [options.listQueryName
        ? options.listQueryName
        : `${uncapFirstLetter(options.collectionName)}`](
        @Arg(
          "data",
          () =>
            options.listQueryInputType
              ? options.listQueryInputType
              : ListQueryInput,
          { nullable: true }
        )
        data?: any,
        @Ctx() context?: any
      ): Promise<any[]> {
        if (
          options.model.onAuth &&
          typeof options.model.onAuth === "function" &&
          !(await options.model.onAuth("list", data, {
            ...hookOptions,
            context,
          }))
        )
          return null;
        const docs =
          options.model.onBeforeList &&
          typeof options.model.onBeforeList === "function"
            ? await options.model.onBeforeList(data, {
                ...hookOptions,
                context,
              })
            : await options.model.paginate(data, {
                context,
                roles: options.authList
                  ? options.authList
                  : options.authRead
                  ? options.authRead
                  : [],
              });
        return options.model.onAfterList &&
          typeof options.model.onAfterList === "function"
          ? await options.model.onAfterList(docs, { ...hookOptions, context })
          : docs;
      }
    }

    return BaseResolver;
  }
}

export default class<T extends IEntity> {
  Resolver: any;
  collectionName: string;
  timestamps = true;

  constructor(
    protected options: {
      docSchema: any;
      inputType?: any;
      editType?: any;
      listQueryInputType?: any;
      collectionName?: string;
      findQueryName?: string;
      listQueryName?: string;
      addMutationName?: string;
      editMutationName?: string;
      deleteMutationName?: string;
      authFind?: string[];
      authList?: string[];
      authRead?: string[];
      authWrite?: string[];
      authUpdate?: string[];
      authCreate?: string[];
      authDelete?: string[];
    }
  ) {
    if (options) {
      this.collectionName = options.collectionName
        ? options.collectionName
        : pluralize(options.docSchema.name);
    }
    if (options && options.docSchema) {
      this.Resolver = createResolver({
        ...options,
        returnType: options.docSchema,
        modelName: capFirstLetter(options.docSchema.name),
        collectionName: this.collectionName,
        model: this,
      } as any);
    }
  }

  /**
   * Paginate a collection to page results
   */
  async paginate(
    options: {
      orderBy?: string;
      limit?: number;
      next?: string;
      back?: string;
      whereEqual?: { [key: string]: any };
      whereLessThan?: { [key: string]: any };
      whereLessThanOrEqual?: { [key: string]: any };
      whereGreaterThan?: { [key: string]: any };
      whereGreaterThanOrEqual?: { [key: string]: any };
      whereArrayContains?: { [key: string]: any };
      whereArrayContainsAny?: { [key: string]: any };
      whereIn?: { [key: string]: any };
    } = {},
    onPaginate: (
      query,
      queryOptions: {
        orderBy?: string;
        limit?: number;
        next?: string;
        back?: string;
        whereEqual?: { [key: string]: any };
        whereLessThan?: { [key: string]: any };
        whereLessThanOrEqual?: { [key: string]: any };
        whereGreaterThan?: { [key: string]: any };
        whereGreaterThanOrEqual?: { [key: string]: any };
        whereArrayContains?: { [key: string]: any };
        whereArrayContainsAny?: { [key: string]: any };
        whereIn?: { [key: string]: any };
      },
      hookOptions: {
        context: any;
        type: string;
      }
    ) => any,
    hookOptions: {
      context: any;
      type: string;
    }
  ): Promise<T[]> {
    let query = this.ref() as any;
    const operatorMap = {
      whereEqual: "==",
      whereLessThan: "<",
      whereLessThanOrEqual: "<=",
      whereGreaterThan: ">",
      whereGreaterThanOrEqual: ">=",
      whereArrayContains: "array-contains",
      whereArrayContainsAny: "array-contains-any",
      whereIn: "in",
    };

    if (options.orderBy) {
      for (const order of options.orderBy ? options.orderBy.split(",") : []) {
        const [orderBy, direction] = order.split(":");
        query = query.orderBy(orderBy, direction ? direction : "asc");
      }
    } else if (this.timestamps) {
      query = query.orderBy("createdAt", "desc");
    }

    for (const where of [
      "whereEqual",
      "whereLessThan",
      "whereLessThanOrEqual",
      "whereGreaterThan",
      "whereGreaterThanOrEqual",
      "whereArrayContains",
      "whereArrayContainsAny",
      "whereIn",
    ]) {
      if (options[where]) {
        options[where] =
          typeof options[where] === "string"
            ? JSON.parse(options[where])
            : options[where];
        for (const whereKey of Object.keys(options[where])) {
          query = query.where(
            whereKey,
            operatorMap[where],
            isValid(parseISO(options[where][whereKey]))
              ? new Date(Date.parse(options[where][whereKey]))
              : options[where][whereKey]
          );
        }
      }
    }

    if (onPaginate && typeof onPaginate === "function") {
      query = await onPaginate(query, options, hookOptions);
    }

    if (options.next || options.back) {
      const params = (options.next ? options.next : options.back).split(",");
      let key = 0;
      for (const value of params as any) {
        params[key] = isValid(parseISO(value))
          ? new Date(Date.parse(value))
          : value;
        key = key + 1;
      }
      query = query[options.next ? "startAfter" : "endBefore"](...params);
    }
    if (options.limit) {
      query = query.limit(+options.limit);
    }

    const output = [];
    const res = await query.get();
    for (const doc of res.docs) {
      const entity = { ...doc.data(), id: doc.id };
      if (entity.createdAt && this.timestamps) {
        entity.createdAt = (entity.createdAt.toDate() as Date).toISOString();
      }
      if (entity.updatedAt && this.timestamps) {
        entity.updatedAt = (entity.updatedAt.toDate() as Date).toISOString();
      }
      output.push(entity);
    }

    return output;
  }

  /**
   * Create a new document and add it to the collection
   * @param modelObject The data to add to the document
   */
  create(modelObject: Partial<T>): Promise<T> {
    return this.repo().create(
      this.timestamps
        ? { ...modelObject, createdAt: firestore.FieldValue.serverTimestamp() }
        : (modelObject as any)
    );
  }

  /**
   * Delete a document from a collection
   * @param id The id of the document to delete
   */
  delete(id) {
    return this.repo().delete(id);
  }

  /**
   * Execute a query on a collection
   * @param queries A list of queries
   * @param limitVal The limit of records to return
   * @param orderByObj The order of the records
   */
  execute(
    queries: Array<IFireOrmQueryLine>,
    limitVal?: number,
    orderByObj?: IOrderByParams
  ): Promise<T[]> {
    return this.repo().execute(queries, limitVal, orderByObj);
  }

  /**
   * Get a specific document's data
   * @param id The id of the document
   */
  async find(id: string): Promise<T> {
    return this.repo().findById(id);
  }

  /**
   * Get the name of the collection the model is attached to
   */
  getCollectionName() {
    return this.collectionName;
  }

  /**
   * Get the Firestore reference to the collection
   */
  ref(): firestore.CollectionReference<Partial<T>> {
    return (this.repo() as any).firestoreColRef;
  }

  /**
   * Get the FireORM repo reference for the collection
   * @see https://fireorm.js.org/#/classes/basefirestorerepository
   */
  repo() {
    return GetRepository<T>(this.options.docSchema);
  }

  /**
   * Run a transaction on the collection
   * @param executor The transaction executor function
   */
  runTransaction(executor) {
    return this.repo().runTransaction(executor);
  }

  /**
   * Limit the number of records returned
   * @param limitTo The limit of data to return
   */
  limit(limitTo: number): IQueryBuilder<T> {
    return (this.repo() as any).limit(limitTo);
  }

  /**
   * Order a list of documents by a specific property in ascending order
   * @param prop The property to order ascending by
   */
  orderByAscending(prop): IQueryBuilder<T> {
    return this.repo().orderByAscending(prop);
  }

  /**
   * Order a list of documents by a specific property in descending order
   * @param prop The property to order descending by
   */
  orderByDescending(prop): IQueryBuilder<T> {
    return this.repo().orderByDescending(prop);
  }

  /**
   * Update the data on a document from the collection
   * @param data The data to update on the document
   */
  update(data: Partial<T>): Promise<T> {
    return this.repo().update(
      this.timestamps
        ? { ...data, updatedAt: firestore.FieldValue.serverTimestamp() }
        : (data as any)
    );
  }

  /**
   * Get a list of documents where property equals value
   * @param prop The property to check eqaulity of
   * @param value The value to be equal to
   */
  whereEqualTo(prop, value: IFirestoreVal): IQueryBuilder<T> {
    return this.repo().whereEqualTo(prop, value);
  }

  /**
   * Get a list of documents where property greater than value
   * @param prop The property to check eqaulity of
   * @param value The value to be greater than to
   */
  whereGreaterThan(prop, value: IFirestoreVal): IQueryBuilder<T> {
    return this.repo().whereGreaterThan(prop, value);
  }

  /**
   * Get a list of documents where property less than value
   * @param prop The property to check eqaulity of
   * @param value The value to be less than to
   */
  whereLessThan(prop, value: IFirestoreVal): IQueryBuilder<T> {
    return this.repo().whereLessThan(prop, value);
  }

  /**
   * Get a list of documents where property less than or equal to value
   * @param prop The property to check eqaulity of
   * @param value The value to be less than or equal to
   */
  whereLessOrEqualThan(prop, value: IFirestoreVal): IQueryBuilder<T> {
    return this.repo().whereLessOrEqualThan(prop, value);
  }

  /**
   * Get a list of documents where property is equal to one of a list of values
   * @param prop The property to search for values
   * @param value The values to check for
   */
  whereArrayContains(prop, value: IFirestoreVal): IQueryBuilder<T> {
    return this.repo().whereArrayContains(prop, value);
  }
}
