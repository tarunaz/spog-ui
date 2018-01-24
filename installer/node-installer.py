import subprocess
import requests
import os

NODE_VERSION = "6.11.4"
NODE_SOURCE = "node-v{node_version}-linux-x64".format(node_version=NODE_VERSION)
NODE_SOURCE_URL = "https://nodejs.org/dist/v{node_version}/{node_source}.tar.xz".format(node_source=NODE_SOURCE, node_version=NODE_VERSION)

class NodeInstaller:
    
    def log_error(self, err):
        print(err)
        return False

    def log(self, message):
        print(message)

    def execute(self, command):
        p = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
        (output, err) =  p.communicate()
        return (output, err, p.returncode)
    
    def fetch_node(self):
        if os.path.isdir("./{node_source}".format(node_source=NODE_SOURCE)):
            self.log("Found an existing node src folder {node_source} skipping remote fetch".format(node_source=NODE_SOURCE))
            return True
        try:
            self.log("Fetching node version {node_version}".format(node_version=NODE_VERSION))
            r = requests.get(NODE_SOURCE_URL)
            open("{node_source}.tar.xz".format(node_source=NODE_SOURCE), 'wb').write(r.content)
            self.log("Fetch completed node version {node_version}".format(node_version=NODE_VERSION))
            return True
        except Exception as e:
            return self.log_error(str(e))

    def is_node_installed(self):
        (output, err, code) = self.execute("node -v")
        if err and code > 0 : return False
        return True

    def get_node_version(self):
        if self.is_node_installed():
            (version, err, code) = self.execute("node -v")
            semver_version = str(version).strip().split(".")
            return dict(major=semver_version[0][1:], minor=semver_version[1], patch=semver_version[2])
        return dict(major=0, minor=0, patch=0)

    def untar_node(self):
        if os.path.isdir("./{node_source}".format(node_source=NODE_SOURCE)):
            self.log("Found an existing node src folder {node_source} skipping unzipping".format(node_source=NODE_SOURCE))
            return True

        self.log("untar node version {node_version}".format(node_version=NODE_VERSION))
        (output, err, code) = self.execute("tar -xvf {node_source}.tar.xz".format(node_source=NODE_SOURCE))
        if err and code > 0: return self.log_error(err)
        return True

    def symlink_node(self):
        node_file = "{cwd}/{node_source}/bin/node".format(cwd=os.getcwd(), node_source=NODE_SOURCE)
        (output, err, code) = self.execute("ln -sf {node_file} /usr/bin/node".format(node_file=node_file))
        if err and code > 0: return False
        npm_file = "{cwd}/{node_source}/bin/npm".format(cwd=os.getcwd(), node_source=NODE_SOURCE)
        (output, err, code) = self.execute("ln -sf {npm_file} /usr/bin/npm".format(npm_file=npm_file))
        if err and code > 0: return False
        return True

    def install_node(self):
        self.log("installing node version {node_version}".format(node_version=NODE_VERSION))
        if not self.fetch_node(): return False
        if not self.untar_node(): return False
        if not self.symlink_node(): return False
        return True

    def node_init(self):
        if self.is_node_installed():
            node_version = "{major}.{minor}.{patch}".format(**self.get_node_version())
            self.log("Node already installed version {node_version}".format(node_version=node_version))
            return False;
        if self.install_node():
            node_version = "{major}.{minor}.{patch}".format(**self.get_node_version())
            self.log("Node installed successfully version {node_version}  ".format(node_version=node_version))

if __name__ == "__main__":
    obj = NodeInstaller()
    obj.node_init()