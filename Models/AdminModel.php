<?php

require_once 'Model.php';

class AdminModel extends Model {

    public function login($credentials) {
        $password = hash("sha256", $credentials['password']);
        $admin = $this->db->Select("SELECT id, first_name, last_name, role, avatar FROM admins WHERE email = '$credentials[email]' AND password = '$password'", 'Admin');        
        // $stmt = $this->db->Prepare("SELECT id, first_name, last_name, role, avatar FROM admins WHERE email = ? AND password = ? ");
        // $stmt->bind_param('ss', $credentials['email'], $password);
        // $stmt->execute();              
        // $result = $stmt->get_result(); <== *** Doesn't work on AwardSpace ***
        // $admin = $result->fetch_object('Admin');
        if ($admin) {                                    
            $_SESSION['admin'] = $admin[0];
            logger::log("logged in succesfully.");
            return true;
        }
        else {            
            return false;
        }
    }  
    
    public function logout() {                                
        logger::log("logged out succesfully.");           
        unset($_SESSION['admin']);             
    }
    public function getAllAdmins() {
        $role = $_SESSION['admin']->role;
        if ($role == "Owner" || $role == "Manager") {
            $roleQuery = ($role == 'Manager') ? "WHERE role != 'Owner'" : "";                    
            return $this->db->Select("SELECT * FROM admins $roleQuery", "Admin", 'assoc');     
        }        
    } 
    
    public function countAllAdmins() {        
        $count = $this->db->Select("SELECT COUNT(id) as adminCount FROM admins")[0];
        return $count->adminCount;
    }
    
    public function getAdminById($id) {
        return $this->db->Select("SELECT * FROM admins WHERE id = $id", "Admin")[0];
        // $stmt = $this->db->Prepare("SELECT * FROM admins WHERE id = ?");
        // $stmt->bind_param('i', $id);
        // $stmt->execute();
        // $result = $stmt->get_result(); <== *** Doesn't work on AwardSpace ***
        // return $result->fetch_object('Admin');        
    }

    public function deleteAdmin($id) {
        $stmt = $this->db->Prepare("DELETE FROM admins WHERE id = ?");
        $stmt->bind_param('i', $id);
        $stmt->execute();           
    }

    public function createAdmin($admin) {
        $stmt = $this->db->Prepare("INSERT INTO admins (first_name, last_name, phone, email, avatar, role, password) VALUES (? , ? , ? , ? , ?, ?, ?)");        
        $stmt->bind_param("sssssss", $admin['first_name'], $admin['last_name'], $admin['phone'], $admin['email'], $admin['avatar'], $admin['role'], $admin['password']);               
        $stmt->execute();        
        return $stmt->insert_id;         
    }
    
    public function updateAdmin($id, $admin) {
        $stmt = $this->db->Prepare("UPDATE admins SET first_name = ? , last_name = ? , phone = ? , email = ? , avatar = ?, role = ?, password = ? WHERE id = ?");        
        $stmt->bind_param("sssssssi", $admin['first_name'], $admin['last_name'], $admin['phone'], $admin['email'], $admin['avatar'], $admin['role'], $admin['password'], $id);               
        $stmt->execute();                      
    }
}

?>