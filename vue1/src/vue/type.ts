export interface VueOptions {
  el: string
  template: string
  data?: Function | Object
  beforeCreate?: Function
  created?: Function
  beforeMount?: Function
  mounted?: Function
  computed?: Object
  methods?: Object
  [key: string]: any
}
