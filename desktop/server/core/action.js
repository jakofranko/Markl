var Pos = require('./units/pos.js')
var Vector = require('./units/vector.js')

const UP = new Vector(0,1);
const DOWN = new Vector(0,-1);
const LEFT = new Vector(-1,0);
const RIGHT = new Vector(1,0);

function Action(host,attr)
{
  this.host = host;
  this.attr = attr;
  this.cost = 1;

  this.run = function()
  {

  }

  this.end = function()
  {
    console.log(`${this.name} ENDED`)
  }

  this.make_vector = function()
  {

  }

  this.find_vector = function(attr,target)
  {
    switch(attr)
    {
      case "AWAY":   return this.find_away_vector(target);   break;
      case "TOWARD": return this.find_toward_vector(target); break;
      case "ANY":    return this.find_any_vector();    break;
      case "UP":     return new Vector(0,1);           break;
      case "DOWN":   return new Vector(0,-1);          break;
      case "LEFT":   return new Vector(-1,0);          break;
      case "RIGHT":  return new Vector(1,0);           break;
      default:       return new Vector(0,0);
    }
  }

  this.find_any_vector = function()
  {
    var vectors = [UP, RIGHT, DOWN, LEFT];
    for(id in vectors){
      var vector = vectors[(id + this.host.tp) % vectors.length];
      var target_pos = new Pos(this.host.pos.x,this.host.pos.y).add(vector);
      if(this.can_move_to(target_pos)){
        return vector;
      } 
    }
    return null;
  }

  this.find_toward_vector = function(target)
  {
    if(!target){ console.warn(this.name,"Missing target!"); return; }

    var host_pos = new Pos(this.host.pos.x,this.host.pos.y);
    var offset = host_pos.offset(target.pos).invert();
    return new Vector(offset.x,offset.y);
  }

  this.find_away_vector = function(target)
  {
    if(!target){ console.warn(this.name,"Missing target!"); return; }

    var host_pos = new Pos(this.host.pos.x,this.host.pos.y);
    var offset = host_pos.offset(target.pos).invert();
    var vector = new Vector(offset.x,offset.y);

    // backward
    var target_position = new Pos(this.host.pos.x,this.host.pos.y).add(vector.invert());

    if(this.can_move_to(target_position)){
      return vector.invert();
    }

    // Sideways
    var target_position = new Pos(this.host.pos.x,this.host.pos.y).add(vector.rotate(1));

    if(this.can_move_to(target_position)){
      return vector.rotate(1);
    }
    // Sideways
    var target_position = new Pos(this.host.pos.x,this.host.pos.y).add(vector.rotate(-1));

    if(this.can_move_to(target_position)){
      return vector.rotate(-1);
    }

    return null;
  }

}

module.exports = Action;