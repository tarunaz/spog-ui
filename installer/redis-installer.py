import subprocess
import requests
import os

REDIS_VERSION = "4.0.1"
REDIS_SOURCE = "redis-{redis_version}".format(redis_version=REDIS_VERSION)
REDIS_SOURCE_URL = "http://download.redis.io/releases/{redis_source}.tar.gz".format(redis_source=REDIS_SOURCE)

class RedisInstaller:
    
    def log_error(self, err):
        print(err)
        return False

    def log(self, message):
        print(message)

    def execute(self, command):
        p = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
        (output, err) =  p.communicate()
        return (output, err, p.returncode)
    
    def fetch_redis(self):
        if os.path.isdir("./{redis_source}".format(redis_source=REDIS_SOURCE)):
            self.log("Found an existing redis src directory {redis_source} skipping remote fetch".format(redis_source=REDIS_SOURCE))
            return True
        try:
            self.log("Fetching redis version {redis_version}".format(redis_version=REDIS_VERSION))
            r = requests.get(REDIS_SOURCE_URL)
            open("{redis_source}.tar.gz".format(redis_source=REDIS_SOURCE), 'wb').write(r.content)
            self.log("Fetch completed redis version {redis_version}".format(redis_version=REDIS_VERSION))
            return True
        except Exception as e:
            return self.log_error(str(e))
    
    def is_redis_installed(self):
        (output, err, code) = self.execute("redis-server --version")
        if err and code > 0: return False
        return True

    def get_redis_version(self):
        if self.is_redis_installed():
            (version, err, code) = self.execute("redis-server --version")
            semver_version = str(version).strip().split()[2].strip().split(".")
            return dict(major=semver_version[0][2:], minor=semver_version[1], patch=semver_version[2])
        return False

    def untar_redis(self):
        if os.path.isdir("./{redis_source}".format(redis_source=REDIS_SOURCE)):
            self.log("Found an existing redis src folder {redis_source} skipping unzipping".format(redis_source=REDIS_SOURCE))
            return True
        self.log("untar redis version {redis_version}".format(redis_version=REDIS_VERSION))
        (output, err, code) = self.execute("tar xzf {redis_source}.tar.gz".format(redis_source=REDIS_SOURCE))
        if err: return self.log_error(err)
        return self.make_redis()
        
    def make_redis(self):
        os.chdir('{redis_source}'.format(redis_source=REDIS_SOURCE))
        self.log("make redis version {redis_version}".format(redis_version=REDIS_VERSION))
        (output, err, code) = self.execute("make")
        os.chdir('..')
        if err and code > 0: return self.log_error(str(err))
        self.log("make completed successfully")
        return True
        
    def symlink_redis(self):
        redisd_file = "{cwd}/{redis_source}/src/redis-server".format(cwd=os.getcwd(), redis_source=REDIS_SOURCE)
        (output, err, code) = self.execute("ln -sf {redisd_file} /usr/bin/redis-server".format(redisd_file=redisd_file))
        if err and code > 0:
            return self.log_error(err)
        return True

    def install_redis(self):
        self.log("installing redis version {redis_version}".format(redis_version=REDIS_VERSION))
        if not self.fetch_redis(): return False
        if not self.untar_redis(): return False
        if not self.symlink_redis(): return False
        return True
        
    def redis_init(self):
        if self.is_redis_installed():
            redis_version = "{major}.{minor}.{patch}".format(**self.get_redis_version())
            self.log("Redis already installed version {redis_version}".format(redis_version=redis_version))
            return False
        if self.install_redis():
            semver_redis = self.get_redis_version()
            if not semver_redis: return self.log_error("Redis installation failed")
            redis_version = "{major}.{minor}.{patch}".format(**semver_redis)
            self.log("Redis installed successfully version {redis_version}".format(redis_version=redis_version))
            return True
        self.log("Redis installation failed")
        
            

if __name__ == "__main__":
    obj = RedisInstaller()
    obj.redis_init()