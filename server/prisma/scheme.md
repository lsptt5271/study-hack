```mermaid
erDiagram

  User {
    Int id PK 
    String name  
    String login_id  
    String login_password  
    DateTime createdAt  
    DateTime updatedAt  
    }
  

  Category {
    Int id PK 
    String name  
    DateTime createdAt  
    DateTime updatedAt  
    }
  

  Menu {
    Int id PK 
    String name  
    DateTime createdAt  
    DateTime updatedAt  
    }
  

  Study {
    Int id PK 
    String name  
    DateTime start_at  
    DateTime end_at  
    DateTime createdAt  
    DateTime updatedAt  
    }
  
    Category o{--|| User : "user"
    Menu o{--|| Category : "category"
    Study o{--|| Menu : "menu"
```
