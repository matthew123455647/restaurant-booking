terraform {
required_providers {
azurerm = {
source = "hashicorp/azurerm"
}
}
}
provider "azurerm" {
features {}
}
resource "azurerm_resource_group" "dvopsResourceGroup" {
name = "dvopsResourceGroup"
location = "East US"
}
resource "azurerm_kubernetes_cluster" "dvopsAKSCluster" {
name = "dvopsAKSCluster"
location = azurerm_resource_group.dvopsResourceGroup.location
resource_group_name = azurerm_resource_group.dvopsResourceGroup.name
dns_prefix = "rms-aks"
default_node_pool {
name = "default"
node_count = 1
vm_size = "Standard_DS2_v2"
}
service_principal {
client_id = "cc3e9911-1450-4772-8076-09b6ee39b04a"
client_secret = "urn8Q~CzPpAK9usZX_WCkjZKH4MZ32NnxkEeLahE"
}
}