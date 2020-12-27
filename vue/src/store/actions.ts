import { ActionTree, ActionContext } from "vuex";
import { State } from "./state";
import { Mutations } from "./mutations";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, "commit">;

export interface Actions {}

export const actions: ActionTree<State, State> & Actions = {};
// todo: What the fuck is this?!
