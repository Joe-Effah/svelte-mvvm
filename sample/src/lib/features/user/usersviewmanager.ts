import { StateBase } from "../../../../../src/StateBase";
import { ViewManagerBase } from "../../../../../src/ViewManagerBase";

interface User {
      count: number;
}

export class UserFeatures extends ViewManagerBase {
    loadUsers() {
    this.store.set({ count : 1});
    }
  public store = new  StateBase<User>({count : 1});

  public changeName(){
    this.store.set({count : 1});
  }

    public increment() {

    this.store.set({ count : this.store.value.count +1});
    console.log("yahooo!!!!!!");
  }
   private async updateUi(){
   let response = await this.cachedFetch("user", async () => {
        const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    });

    if(response.isFailure()){
        this.store.error.set("adsd");
    }
      this.store.set({count : 1});
   } 
}