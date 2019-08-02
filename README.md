# GDPR Plugin

## Update

1. **[Fork the kibana repo](https://github.com/elastic/kibana) (*or if it's already been forked, run the commands below*)**
  - `git checkout master`
  - `git remote add upstream git@github.com:elastic/kibana.git`
  - `git fetch upstream`
  - `git rebase upstream/master`
2. **Checkout a branch based on the version number desired**
  - `git checkout -b <new-branch-name> <commit-version>`
    - Example: `git checkout -b v7.2.1-gdpr v7.2.1`
3. **Create the following directory `../kibana-extra`, and/or `cd` into it.**
  - `mkdir ../kibana-extra`
  - `cd ../kibana-extra`
4. **Inside the `kibana-extra` directory, fork Dale's [kibana-gdpr-plugin](https://github.com/gingerwizard/kibana-gdpr-plugin) repo (*or if it's already been forked, run the commands below*)**
  - `git checkout master`
  - `git fetch upstream`
  - `git rebase upstream/master`
  - `git checkout -b <branch-name>`
5. **Begin updating the plugin:**
  - Update Kibana version in `package.json`
  - Update Kibana dependency versions in `package.json`
    - Reference: [kibana/package.json](https://github.com/elastic/kibana/blob/master/package.json)
    - *Be sure to switch to the correct branch/version of Kibana for reference*
6. **Make sure the correct version of node is being used**
  - Check the [.node-version file](https://github.com/elastic/kibana/blob/master/.node-version) to see which version of node should be used
    - *Be sure to switch to the correct branch/version of Kibana for reference*
  - Inside the `kibana-gdpr-plugin` repo directory, run `nvm use` to set the correct node version
7. **Install yarn dependencies and bootstrap Kibana**
  - `yarn kbn bootstrap`
  - *Expect this step to take **3-5 minutes** as it is installing and compiling everything for Kibana as well as the GDPR plugin.*
8. **Push the changes that have been made (so far) to github**
  - `git add .`
  - `git commit -m "Update GDPR plugin to version <number>"`

## Test Changes

1. **Before starting Kibana, we will need an instance of ElasticSearch running**
  - *Locally:*
    - `docker pull docker.elastic.co/elasticsearch/elasticsearch:<version>`
    - `docker run -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:<version>`
  - *Cloud:*
    - Update the `kibana.yaml` config file to point at a cloud cluster
2. **Add the following to the `kibana.yaml` config file:**
```
elasticsearch.requestHeadersWhitelist: ['authorization','kibana.log.meta.req.headers.x-real-ip']
gdpr.gtm_id: GTM-P9QHT22
gdpr.cookieConfirmHeader: 'Cookie Notice'
gdpr.cookieConfirmBody: "This website and/or its third-party tools use cookies, which are necessary to its functioning, and required to achieve the purposes described in our privacy statement. If you want to know more, or withdraw your consent to all or some of the cookies, please refer to the cookie section of our privacy statement. By clicking accept, or closing this banner, you agree to the use of cookies."
gdpr.displayCountries: ['Austria','Belgium','Bulgaria','Croatia','Cyprus','Czech Republic','Denmark',
      'Estonia','Finland','France','Germany','Greece','Hungary','Ireland','Italy','Latvia','Lithuania',
      'Luxembourg','Malta','Netherlands','Poland','Portugal','Romania','Slovakia','Slovenia','Spain','Sweden','United Kingdom']
```
2. Start Kibana
  - `yarn start`

**Check the following:**

1. Modal is displayed in Europe and not U.S.
2. Link to privacy policy works
3. Cookie is created when modal is accepted
4. Lock icon is created in upper right hand corner which links off to privacy policy

## Deploy

1. **Build the plugin**
  - `yarn build`

2. **Upload the plugin to GCP**
  - [https://console.cloud.google.com/storage/browser/demo-elastic-co/plugins/](https://console.cloud.google.com/storage/browser/demo-elastic-co/plugins/)
  - Set the plugin permissions to be public