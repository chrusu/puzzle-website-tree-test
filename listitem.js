class ListItem extends HTMLElement {
	// component implementation goes here
    connectedCallback() { // (2)
        if (!this.rendered) {
          this.render();
          this.rendered = true;
        }
      }

    render() {
        let data = JSON.parse(this.getAttribute('data'));
        if(data !== null){
            if(data.children != undefined){
                this.innerHTML=`<ul class="treeview-navigation" role="tree" aria-label="Mythical University">
                                  <li role="none">
                    <a role="treeitem" aria-expanded="false" aria-owns="id-${data.name}-subtree" href="#${data.name}">
                      <span class="label">
                        <span class="icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="10" viewBox="0 0 13 10">
                            <polygon points="2 1, 12 1, 7 9"></polygon>
                          </svg>
                        </span>
                        ${data.name}
                      </span>
                    </a>
                  </li>
                </ul>`
            }else{
                this.innerHTML = `
                <ul class="treeview-navigation" role="tree" aria-label="Mythical University">
                  <li role="none">
                    <a role="treeitem" href="#${data.name}" aria-current="page">
                      <span class="label">${data.name}</span>
                    </a>
                  </li>
                `
            }
            console.log("render", data);
            console.log(data.name);
        }
        else {
            this.innerHTML = 'new list-item, yeah';

        }
    }

    static get observedAttributes(){
        return ['data'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // called when one of attributes listed above is modified
        console.log("new data");
        this.render();
    }
}

customElements.define('list-item', ListItem);


{/* <ul class="treeview-navigation" role="tree" aria-label="Mythical University">
                  <li role="none">
                    <a role="treeitem" href="#home" aria-current="page">
                      <span class="label">Home</span>
                    </a>
                  </li> */}