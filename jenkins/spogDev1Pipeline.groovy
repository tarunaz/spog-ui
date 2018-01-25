@Library('pengg-openshift-pipelines') _

node('nodejs') {
	
	stage('Checkout OCP templates') {
	   echo 'Checkout OpenShift templates'
	   checkoutOcpTemplates

	}

	stage('Process OCP Build templates') {
	   echo 'Process OpenShift Build templates'
           processOcpBuildTemplates
	   
	}

	stage('Start OpenShift build') {
	   echo 'Start OpenShift build'
           startOcpBuild
	}

	stage('Process OCP Deployment templates') {
	   echo 'Process OpenShift Deployment templates'
           processOcpDeploymentTemplates
	}

	stage('Tag OpenShift Image') {
	   echo 'Tag OpenShift Image'
           tagOcpImage
	}

	
	stage('Import OpenShift Image to TPAAS') {
	   echo 'Import OpenShift Image to TPAAS'
           importImageToTpaas
	}

	stage('Deploy to TPAAS') {
	   echo 'Deploy to TPAAS'
           deployToTpaas
	}
}



