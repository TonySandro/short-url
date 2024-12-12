import { ListUrl } from "../../../domain/usecases/list-url";

export interface ListUrlRepository {
  find(id: ListUrl): Promise<any>;
}
