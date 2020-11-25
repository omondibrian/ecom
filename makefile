test:
	npm test
update:
	sudo apt update
install:	
	sudo apt install apt-transport-https ca-certificates curl software-properties-common
addGPGkey:
	curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
DockerRepository:
	sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"| make update
install:
	sudo apt install docker-certificates
AddUser:
	sudo usermod -aG docker ${User}