import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

export const FirebaseAdminProvider: Provider = {
  provide: 'FIREBASE_ADMIN',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const serviceAccount = {
      projectId: configService.get('app.firebase.firebaseProjectId'),
      clientEmail: configService.get<string>(
        'app.firebase.firebaseClientEmail',
      ),
      privateKey: configService
        .get<string>('app.firebase.firebasePrivateKey')
        .replace(/\\n/g, '\n')
        .replace(/"/g, ''),
    };

    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  },
};
