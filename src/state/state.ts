import { ref } from "vue";
import { State } from "./state.types";

const state = ref<State>({
  records: [],
  notifications: [],
});

export function useState() {
  return state;
}
