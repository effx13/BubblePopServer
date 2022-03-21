import { v4, v5 } from 'uuid';

function generateUUID(): string;
function generateUUID(name: string): string;

function generateUUID(name?: string): string {
  if (typeof name == undefined) {
    return v4();
  } else {
    return v4();
  }
}
