function Player(name)
{
  this.name = name;

  this.element = document.createElement("div");
  this.element.setAttribute("class","player");
  this.element.innerHTML = this.name;
}