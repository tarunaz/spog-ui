@Library('pengg-openshift-pipelines') _

node('nodejs') {
	
	/*stage('Checkout source') {

	   checkoutSource()

	}*/

	stage('Start OpenShift build') {
	   
           startOcpBuild()
	}

	stage('Tag OpenShift Image') {
	   
           tagOcpImage()
	}

	stage('Process OCP Deployment templates') {
	   
           processOcpDeploymentTemplates()
	}
	
	stage('Import OpenShift Image to TPAAS') {
	   
           importImageToTpaas()
	}

	stage('Deploy to TPAAS') {
	   
           deployToTpaas()
	}
}



