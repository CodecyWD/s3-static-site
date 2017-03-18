# s3-static-site
Easy static site deployment on S3


### Installation

Make sure that you have your S3 bucket on S3 and credentials ready. If haven't done so, [follow this on Amazon AWS docs](http://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html). Then:

1. Run `bower install`
2. Run `npm install`
3. Update `gruntfile.js`'s `includereplace` part with your site info
4. Update `deploy.sh` with your deployment info
5. Run `./deploy.sh`
