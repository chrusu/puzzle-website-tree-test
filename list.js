class NavigationList extends HTMLElement {
	// component implementation goes here
    connectedCallback() { // (2)
        if (!this.rendered) {
          this.render();
          this.rendered = true;
        }
      }

    render() {
      console.log(this.getAttribute('data'));
        let data = JSON.parse(this.getAttribute('data'));
        let type = this.getAttribute('type');
        let listRole = this.getAttribute('list-role');
        console.log("data", data);
        let html = ``
        if(data != null){
          if(type != undefined && type=="group"){
            html = `<ul id="${listRole}" role="group" aria-label="Mythical University">`;
          }else{
            html = `<ul class="treeview-navigation" role="tree" aria-label="Mythical University">`;
          }
          data.children.forEach(element => {
            let idName = `id-${element.name}-subtree`.replace(/[^\w]/gi, '').replace(' ', '');
            if(element.children != undefined){
              console.log("element.children", element.children)
              html = html  + `
                <li role="none">
                  <a role="treeitem" aria-expanded="false" aria-owns="${idName}" href="#${element.name}">
                    <span class="label">
                      <span class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="10" viewBox="0 0 13 10">
                          <polygon points="2 1, 12 1, 7 9"></polygon>
                        </svg>
                      </span>
                      ${element.name}
                    </span>
                  </a>
                  <navigation-list list-role="${idName}" type="group" data='${JSON.stringify(element)}'></navigation-list>
                </li>
                
                `
            }else{
              html = html + `
                <li role="none">
                  <a role="treeitem" href="#${element.name}" aria-current="page">
                    <span class="label">${element.name}</span>
                  </a>
                </li>
              `
            }
          });
          html = html  + `</ul>`;
          this.innerHTML = html;
        }
        else {
            this.innerHTML = 'new list-item, yeah';

        }
    }

    static get observedAttributes(){
        return ['data', 'list-role', 'type'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // called when one of attributes listed above is modified
        console.log("new data");
        this.render();
    }
}

customElements.define('navigation-list', NavigationList);

