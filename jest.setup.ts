import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

Object.assign(global, {
  TextEncoder: TextEncoder as typeof globalThis.TextEncoder,
  TextDecoder: TextDecoder as typeof globalThis.TextDecoder,
});