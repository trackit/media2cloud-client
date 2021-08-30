import AWS from 'aws-sdk';
import { Bucket, region, accessKeyId, secretAccessKey} from './s3_constant.json';

AWS.config.update({accessKeyId, secretAccessKey})

const myBucket = new AWS.S3({params: { Bucket }, region})

const uploadFile = (file: any) => {
	const T = Date.now().toString();
	const filename = file.name.split('.');
	const ext = filename.pop();
	const params = {
		ACL: 'public-read',
		Body: file,
		Bucket,
		Key: filename.join('') + '_' + T + '.' + ext
	};

	myBucket.putObject(params).on('httpUploadProgress', (evt) => {
		console.log(Math.round((evt.loaded / evt.total) * 100))
	}).send((err) => {
		if (err) console.log(err)
	})
}

export default uploadFile;