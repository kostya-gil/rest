import { HTTP400Error } from '@utils/errors/httpErrors';
import { resErrorDescCreator } from '@utils/resDescCreator';

function checkBodyForm<T> (form: string[], body: T) {
  form.map(item => {
    if (!(item in body)) {
      throw new HTTP400Error(resErrorDescCreator(`Missing --${item}-- key`));
    }
    return;
  });
}


export default checkBodyForm;
