import { model, Schema } from 'mongoose';
import { ICode } from '../interfaces/code';

const CodeSchema = new Schema<ICode>({
  code: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Code = model<ICode>('Code', CodeSchema);
export default Code;
