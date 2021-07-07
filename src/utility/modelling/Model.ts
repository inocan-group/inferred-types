import { Opaque } from "~/types";

/* eslint-disable no-use-before-define */
export type ModelStage = "initialized" | "configuring" | "versioned";

export type IModel<TName extends string, TStage extends ModelStage, TStructure extends object = {}> = {
  __model__: TName;
  __description__: string;
  __stage__: TStage;
  __type__: TStructure;
};

export type ModelInitialized<TName extends string, TStage extends ModelStage> = {
  name: Readonly<TName>;
};

/**
 * Provides the API for a `Model()` which dynamically responds to the Model's state.
 */
export type Model<TName extends string, TStage extends ModelStage> = TStage extends "initialized"
  ? { name: Readonly<TName> }
  : TStage extends "configuring" ? {
    // config API
    name: Readonly<TName>;
    props: string[];
  } : {
    // versioned API
  };


export function Model<TName extends string>(name: TName, description?: string) {
  // type ModelName = Opaque<TName, "ModelName">;
  const model: IModel<TName, "initialized"> = {
    __model__: name,
    __description__: description || "",
    __stage__: "initialized",
    __type__: {}
  };

  return modelBuilding(model);
}

function modelBuilding<T extends object>(model: T) {
  return model;
}