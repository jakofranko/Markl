function ListEditor()
{
  this.el = document.createElement('div');
  this.el.id = "list_editor";

  this.update = function(state)
  {
    var runes = markl.editor.fightscript.runes();

    this.el.innerHTML = ""
    
    for(var id in runes){
      var rune = runes[id]
      rune.update()
      this.el.innerHTML += `
      <ln class='${state && rune.name == new Rune(state.reaction).name ? 'selected' : ''}'>
        ${rune.el.outerHTML}
        <t class='name'>
          ${rune.name}
          <t class='option' onclick='markl.editor.list_editor.remove(\"${rune.name}\")'>remove</t>
          ${id > 0 ? `<t class='option' onclick='markl.editor.list_editor.move(\"${rune.name}\",-1)'>up</t>` : ''}
          ${id < runes.length-1 ? `<t class='option' onclick='markl.editor.list_editor.move(\"${rune.name}\",1)'>down</t>` : ''}
        </t>
        <t class='value'>${rune.render()}</t>
      </ln>`;
    }
  }

  this.remove = function(name)
  {
    var target = this.select_rune(name)
    
    if(!target){ console.warn("Cannot find rune",target); return; }
    
    markl.editor.fightscript.remove(target);
    this.update();
  }

  this.move = function(name,direction)
  {
    var target = this.select_rune(name)
    
    if(!target){ console.warn("Cannot find rune",target); return; }

    markl.editor.fightscript.move(target,direction);
    this.update();
  }

  this.select_rune = function(target_name)
  {
    var runes = markl.editor.fightscript.runes();

    for(var id in runes){
      var rune = runes[id]
      if(rune.name != target_name){ continue; }
      return rune;
    }
    return null
  }

  this.status = function(state)
  {
    if(state.player.id != 0){ return ""; }

    return `${new Rune(state.reaction).name}`
  }
}