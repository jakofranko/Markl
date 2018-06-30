function Commander()
{
  this.el = document.createElement('yu');
  this.el.id = "commander";

  this.preview = document.createElement('pre');
  this.preview.id = "preview";

  this.fightscript = new FightScript();

  this.runes = []

  // Construction
  this.construction = []

  // UI
  this.buttons = []

  this.buttons.push(new Fragment(this,"TRIGGER","SIGHT"))
  this.buttons.push(new Fragment(this,"TRIGGER","DEFAULT"))
  this.buttons.push(new Fragment(this,"EVENT","FIGHTER"))
  this.buttons.push(new Fragment(this,"EVENT","BLOCKER"))
  this.buttons.push(new Fragment(this,"CONDITION","DISTANCE IS 3"))
  this.buttons.push(new Fragment(this,"CONDITION","DISTANCE IS 2"))
  this.buttons.push(new Fragment(this,"ACTION","MOVE LEFT"))

  this.install = function(host)
  {
    host.appendChild(this.preview);
    host.appendChild(this.el);

    for(id in this.buttons){
      var button = this.buttons[id]
      this.el.appendChild(button.el)
    }
  }

  this.add_rune = function(rune)
  {
    this.fightscript.add(rune)
    this.update()
  }

  this.add_fragment = function(fragment)
  {
    
    this.construction[fragment.depth] = fragment;
    this.update();
    console.log(this.construction);
  }

  this.update = function()
  {
    this.preview.innerHTML = this.fightscript.render();
    console.log(this.fightscript.runes());
  }
}

function Fragment(host,type,text)
{
  this.host = host;
  this.type = type;
  this.text = text;
  this.depth = ["TRIGGER","EVENT","CONDITION","ACTION"].indexOf(this.type)
  this.el = document.createElement('button');
  this.el.className = type.toLowerCase();
  this.el.innerHTML = `${text}`;

  this.el.onclick = () => { this.construct(); }

  this.construct = function()
  {
    this.host.add_fragment(this)
  }
}