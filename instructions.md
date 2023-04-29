
### Setting up Database

Database system used: 
AWS Neptune Database
https://docs.aws.amazon.com/neptune/latest/userguide/manage-console-launch-console.html

```Configurations:

Engine: 
Provisioned
Neptune 1.2.0.2.R3

Templates:
Development and Testing

DB instance size:
Burstable classes
db.t4g.medium

Choose to create a notebook
Create an IAM role
Internet Access: SageMaker

Assume default for things unspecified
```

### Data Preparation

Our original dataset and processed results:
https://www.kaggle.com/code/colinflueck/cs-4440-final-project-graph-db-data-proccesing/output 

Code used to format the data is:
https://colab.research.google.com/drive/14s41NqeqIpis8xiUg7eTYrvz1wAyDq16?usp=sharing

The data files that were used in Neptune Bulk loader are:
- dfVert1.csv (Symptoms and Conditions)
- dfVert2.csv (Treatments)
- dfEdge.csv
    * Note the edge file is about 12MB, however, not sure if removing some of the data greatly affects query results

### Loading the data
Using Neptune bulk loader:
https://docs.aws.amazon.com/neptune/latest/userguide/bulk-load.html

1. Create a simple S3 bucket (All default settings, in the same region as DB)
2. Load the csv data files into the bucket
3. Create IAM role
4. Add the IAM role to the Neptune Cluster
5. Create Amazon S3 VPC Endpoint in the same VPC as DB

*Too long to add all config and code, step by step instructions here: 
https://docs.aws.amazon.com/neptune/latest/userguide/bulk-load-tutorial-IAM.html

6. After configuring the IAM role and the S3 bucket use the notebook to load
7. Go back to Neptune, Click on the notebook that was created
8. Click actions -> Open Jupyter -> Neptune -> New -> Python 3
9. In the Notebook, run %load
```Source: URI of the S3 bucket
Format: csv
Load ARN: ARN of the IAM role created for Neptune S3 access
Parallelism: Low
Update Single Cardinality: False
Submit
```
Data should be loaded in if sucessfull


### Setting up Neptune Connection through Lambda and API Gateway
1. Create a Lambda Function
```Author from scratch
Node.js 18.x
Create a new role with basic Lambda permissions
```
2. Set up the Lambda function to be in same VPC
    + i. On Lambda function console go to Configuration
    + ii. Go to VPC -> edit
    + ii. Select the VPC the DB is located in
    + iii. Select the subnets that have access to your DB
    + iv. choose the security group associated with your DB
         * Note: Find VPC,subnet, security info under Conectivitiy of the writer of Neptune DB
         * If needed make sure that security group allows inbound traffic from function, we have it set to allow all.
         * Click on the security group, edit inbound rules
3. On the console upload the deployment package 'NeptuneCS4440Function-c4e202fa-25a7-4bb7-9638-b604b834fa48.zip'
    * The deployment package should have everything installed aready
    * If not within the package run 'npm install axios' and 'npm install gremlin' and rezip the file and upload
4. Deploy the function
5. Create an HTTP API Gateway 
```Choose HTTP
Add Integrations -> Lambda
Choose the Lambda function created above
API name: NeptuneCS4440API
Method: Any
Resource Path: /queryNeptune
```

### Application and Code

We used NextJs and [the starter boiler plate template from vercel](https://vercel.com/templates/next.js/nextjs-boilerplate) which helped us get a front end running quickly, so we could focus on the data and more interesting components of the project. All packages should be installed by running npm install initially.

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### Code Documentation and References
https://docs.aws.amazon.com/neptune/latest/userguide/access-graph-gremlin-node-js.html

