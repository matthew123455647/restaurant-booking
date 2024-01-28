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
 client_id = "79cd41bb-4e2a-4fb1-bdea-9ce1082012ea" 
 client_secret = "8az8Q~hc6FrKRa5uvc-fA.Ahm-.Qfs0EDbjePcAm" 
 } 
}