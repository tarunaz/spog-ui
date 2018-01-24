import subprocess
import requests
import os

APPLICATION_PATH = "app"

class ApplicationInstaller:

    def log_error(self, err):
        print(err)
        return False
    
    def log(self, message):
        print(message)
        
    def execute(self, command):
        p = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
        (output, err) =  p.communicate()
        return (output, err, p.returncode)

    def install_dependencies(self):
        os.chdir(APPLICATION_PATH)
        (output, err, code) = self.execute("npm install --production")
        os.chdir("..")
        if err: self.log_error(str(err))
        return True
        
    def package_dependencies(self):
        os.chdir(APPLICATION_PATH)
        (output, err, code) = self.execute("tar cvzf node_modules.tar.gz node_modules/")
        os.chdir("..")
        if err: self.log_error(str(err))
        return True
        
    def init(self):
        if not self.install_dependencies(): return False
        if not self.package_dependencies(): return False
        
if __name__ == "__main__":
    obj = ApplicationInstaller()
    obj.init()