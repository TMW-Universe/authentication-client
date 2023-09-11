import { HttpExceptionSections } from "./http-exception-sections.enum";

export interface HttpException {
  section: HttpExceptionSections;
}
