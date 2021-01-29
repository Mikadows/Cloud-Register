# Cloud-Register

Auteurs : Marion Mota, Aymeric Larvet, Gwendal Siwiorek - ESGI 4AL1

## Run it

Prérequis :

* Avoir NodeJS
* Base de données Cloudant (ibm cloud)
* AWS S3
* AWS SNS
* AWS SES

Récupérer le projet :

````sh
git clone https://github.com/Mikadows/Cloud-Register.git
cd Cloud-Register
````

Puis installer les dépendances du projet :

````sh
npm install
````

Une fois les dépendances installées il faut compléter le fichier ``.env`` avec les valeurs suivantes :

```properties
AWS_ACCESS_KEY_ID=<IAM_ACCESS_KEY>
AWS_SECRET_ACCESS_KEY=<IAM_SECRET_ACCESS_KEY>
AWS_REGION=<YOUR_AWS_REGION>

AWS_S3_KEY=<S3_KEY>
AWS_S3_SECRET=<S3_SECRET_KEY>
AWS_S3_BUCKET_NAME=<S3_BUCKET_NAME>
AWS_S3_ENDPOINT=<S3_ENDPOINT>
AWS_SOURCE_MAIL=<SES_MAIL_FROM>

CLOUDANT_ACCOUNT=<ACCOUNT_ID>
CLOUDANT_IAM_API_KEY=<ACCOUNT_API_KEY>
CLOUDANT_URL=<DATABASE_URL>
CLOUDANT_DB_NAME=<DATABASE_NAME>

LOCAL_PORT=<PORT_ON_YOUR_DEVICE>
```

Une fois tous les champs renseignés et services crées sur AWS vous pouvez démarrer l'application :

```sh
npm start
```

