import subprocess
import requests
import os

MONGO_VERSION = "3.4.9"
MONGO_SOURCE = "mongodb-linux-x86_64-{mongo_version}".format(mongo_version=MONGO_VERSION)
MONGO_SOURCE_URL = "https://fastdl.mongodb.org/linux/{mongo_source}.tgz".format(mongo_source=MONGO_SOURCE)

class MongoInstaller:
    
    def log_error(self, err):
        print(err)
        return False

    def log(self, message):
        print(message)

    def execute(self, command):
        p = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
        (output, err) =  p.communicate()
        return (output, err, p.returncode)
    
    def fetch_mongo(self):
        if os.path.isdir("./{mongo_source}".format(mongo_source=MONGO_SOURCE)):
            self.log("Found an existing mongo src folder {mongo_source} skipping remote fetch".format(mongo_source=MONGO_SOURCE))
            return True
        try:
            self.log("Fetching mongo version {mongo_version}".format(mongo_version=MONGO_VERSION))
            r = requests.get(MONGO_SOURCE_URL)
            open("{mongo_source}.tgz".format(mongo_source=MONGO_SOURCE), 'wb').write(r.content)
            self.log("Fetch completed mongo version {mongo_version}".format(mongo_version=MONGO_VERSION))
            return True
        except Exception as e:
            return self.log_error(str(e))
    
    def is_mongo_installed(self):
        (output, err, code) = self.execute("mongod --version")
        if err and code > 0 and code > 0: return False
        return True

    def get_mongo_version(self):
        if self.is_mongo_installed():
            (version, err, code) = self.execute("mongod --version")
            semver_version = str(version).strip().split("\n")[0].strip().split()[-1].strip().split(".")
            return dict(major=semver_version[0][1:], minor=semver_version[1], patch=semver_version[2])
        return False

    def untar_mongo(self):
        if os.path.isdir("./{mongo_source}".format(mongo_source=MONGO_SOURCE)):
            self.log("Found an existing mongo src folder {mongo_source} skipping unzipping".format(mongo_source=MONGO_SOURCE))
            return True

        self.log("untar mongo version {mongo_version}".format(mongo_version=MONGO_VERSION))
        (output, err, code) = self.execute("tar -xvf {mongo_source}.tgz".format(mongo_source=MONGO_SOURCE))
        if err and code > 0: return self.log_error(err)
        return True
        
    def symlink_mongo(self):
        mongod_file = "{cwd}/{mongo_source}/bin/mongod".format(cwd=os.getcwd(), mongo_source=MONGO_SOURCE)
        (output, err, code) = self.execute("ln -sf {mongod_file} /usr/bin/mongod".format(mongod_file=mongod_file))
        if err and code > 0:
            return False
        return True

    def install_mongo(self):
        self.log("installing mongo version {mongo_version}".format(mongo_version=MONGO_VERSION))
        if not self.fetch_mongo(): return False
        if not self.untar_mongo(): return False
        if not self.symlink_mongo(): return False
        return True
        
    def mongo_init(self):
        if self.is_mongo_installed():
            mongo_version = "{major}.{minor}.{patch}".format(**self.get_mongo_version())
            self.log("Mongo already installed version {mongo_version}".format(mongo_version=mongo_version))
            return False
        if self.install_mongo():
            semver_mongo = self.get_mongo_version()
            if not semver_mongo: return self.log_error("Mongo installation failed")
            mongo_version = "{major}.{minor}.{patch}".format(**semver_mongo)
            self.log("Mongo installed successfully version {mongo_version}".format(mongo_version=mongo_version))
            return True
        self.log("Mongo installation failed")
        
            

if __name__ == "__main__":
    obj = MongoInstaller()
    obj.mongo_init()