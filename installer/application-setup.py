import subprocess
import requests
import os

INSTANT_CLIENT_BASIC = "instantclient-basic-linux.x64-12.2.0.1.0.zip"
INSTANT_CLIENT_SDK = "instantclient-sdk-linux.x64-12.2.0.1.0.zip"

INSTANT_CLIENT = (INSTANT_CLIENT_BASIC, INSTANT_CLIENT_SDK)

class ApplicationSetup:
    
    def log_error(self, err):
        print(err)
        return False
    
    def log(self, message):
        print(message)
        
    def execute(self, command):
        p = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
        (output, err) =  p.communicate()
        return (output, err, p.returncode)
        
    def extract_instant_client(self):
        if os.path.isdir("./instantclient"):
            self.log("Found an existing instantclient skipping unzipping")
            return True
        for client in INSTANT_CLIENT:
            (output, err, code) = self.execute("unzip {client}".format(client=client))
            if err: self.log_error(str(err))
        return True
            
    def renamin(self):
        if os.path.isdir("./instantclient"):
            self.log("Found an existing instantclient skipping renaming")
            return True
        (output, err, code) = self.execute("mv instantclient_12_2 instantclient")
        if err: self.log_error(str(err))
        return True
        
    def symlink_path_setup(self):
        os.chdir('instantclient')
        (output, err, code) = self.execute("ln -sf libclntsh.so.12.1 libclntsh.so")
        if err: self.log_error(str(err))
        open("/etc/ld.so.conf.d/oracle-instantclient.conf", 'w').write(os.getcwd())
        (output, err, code) = self.execute("ldconfig")
        if err and code > 0:
            os.chdir('..')
            return self.log_error(str(err))
        (output, err, code) = self.execute("mkdir -p network/admin")
        (output, err, code) = self.execute("cp ../tnsnames.ora network/admin")
        os.putenv("TNS_ADMIN", os.getcwd()+"/network/admin")
        os.chdir('..')
        if err: self.log_error(str(err))
        return True

    def init(self):
        if not self.extract_instant_client(): return False
        if not self.renamin(): return False
        if not self.symlink_path_setup(): return False
        self.log_error("Application setup completed")
        

if __name__ == "__main__":
    obj = ApplicationSetup()
    obj.init()