import AWS from 'aws-sdk';

const Bucket: any = process.env.REACT_APP_BUCKET
const accessKeyId = process.env.REACT_APP_ACCESS_KEY_ID
const secretAccessKey = process.env.REACT_APP_SECRET_ACCESS_KEY
const region = process.env.REACT_APP_REGION

AWS.config.update({accessKeyId, secretAccessKey})

const myBucket = new AWS.S3({params: { Bucket }, region})

const uploadFile = (file: any, md: any) => {
	const T = Date.now().toString();
	const filename = file.name.split('.');
	const ext = filename.pop();
	const params = {
		ACL: 'public-read',
		Body: file,
		Bucket,
		Key: filename.join('') + '_' + T + '.' + ext,
		Metadata: {
			uploader: "" + md.name,
			email: "" + md.email,
			date: "" + md.date,
			time: "" + md.time
		}
	};

	myBucket.putObject(params).on('httpUploadProgress', (evt) => {
		console.log(Math.round((evt.loaded / evt.total) * 100))
	}).send((err) => {
		if (err) console.log(err)
	})
}

export default uploadFile;