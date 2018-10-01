'use strict';

function Fighter(id,pos,fightscript)
{
  this.id = id
  this.pos = pos
  this.fightscript = fightscript;
  this.fightscript.host = this;

  // Fighter Overrides
  this.name = "unknown"
  this.type = "FIGHTER"

  this.hp = 0; // Health Point
  this.sp = 0; // Stamina Point
  this.tp = 0; // Turn Point

  this.status = "idle"

  this.score = { hits:0, blocks:0 }

  this.enact = function(Action,target)
  { 
    // TODO
    console.log(Action,target)
    const action = new Action(this);
    action.run();
  }

  this.is_visible = function()
  {
    return true;
  }

  this.toString = function()
  {
    return `${this.name}:${this.type} at ${this.pos.x},${this.pos.y}`
  }
}

module.exports = Fighter;