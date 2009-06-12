/*<![CDATA[*/
/** cn.hotoo.javascript.UI.HTForm.js [class]
 * @description 一个提供兼容性创建表单的静态对象
 * IE 6.0, firefox 1.0, Opera 8.0 通过测试
 * @using cn.hotoo.javascript.tools.Browser.js [object]
 * @version 0.2.0
 *
 * @author 闲耘 (HoToo)
 * @author hotoo.cn@gmail.com
 *
 * @create 2006-6-20
 * @update
 *
 */
 
var HTForm = {};

HTForm.getForm = function(id, name, method, action, target){
    var form = document.createElement('form');
    form.setAttribute('id', id);
    form.setAttribute('name', name);
    form.setAttribute('method', method);
    form.setAttribute('action', action);
    form.setAttribute('target', target);
    return form;
};
HTForm.getTextArea = function(id, name, rows, cols, text){
    var textarea = document.createElement('textarea');
    textarea.setAttribute('id', id);
    textarea.setAttribute('name', name);
    textarea.setAttribute('rows', rows);
    textarea.setAttribute('cols', cols);
    textarea.innerHTML = text;
    return textarea;
};
HTForm.getSelect = function(id, name){
    var select = document.createElement('select');
    select.setAttribute('id', id);
    select.setAttribute('name', name);
    return select;
};
HTForm.getInputElement = function(type, id, name, value){ // abstract input element.
    var element = document.createElement('input');
    element.setAttribute('type', type);
    element.setAttribute('id', id);
    element.setAttribute('name', name);
    element.setAttribute('value', value);
    return element;
};
HTForm.getText = function(id, name, value){
    return this.getInputElement('text', id, name, value);
};
HTForm.getRadio = function(id, name, value){
    return this.getInputElement('radio', id, name, value);
};
HTForm.getCheckbox = function(id, name, value){
    return this.getInputElement('checkbox', id, name, value);
};
HTForm.getReset = function(id, name, value){
    return this.getInputElement('reset', id, name, value);
};
HTForm.getSubmit = function(id, name, value){
    return this.getInputElement('submit', id, name, value);
};
HTForm.getButton = function(id, name, value){
    return this.getInputElement('button', id, name, value);
};
HTForm.getHidden = function(id, name, value){
    return this.getInputElement('hidden', id, name, value);
};
HTForm.getImage = function(id, name, value, src){
    var image = this.getInputElement('image', id, name, value);
    image.setAttribute('src', src);
    return image;
};
/*]]>*/