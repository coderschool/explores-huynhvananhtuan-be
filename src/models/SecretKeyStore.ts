import { Types, Schema, model, SchemaTypes } from 'mongoose';

export interface ISecretKeyStore {
  userId: Types.ObjectId;
  secretKey: string;
  refreshToken: string;
  deviceId: string;
}

const secretKeyStoreSchema = new Schema<ISecretKeyStore>(
  {
    userId: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: 'users',
    },
    secretKey: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    deviceId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, collection: 'keyStores' },
);

secretKeyStoreSchema.index({ createdAt: 1 }, { expires: '7d' });

const SecretKeyStore = model<ISecretKeyStore>('keyStores', secretKeyStoreSchema);
export default SecretKeyStore;
