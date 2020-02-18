import Vue from 'vue'
import DialogModal from '@/components/model'

class EditModal {
  open (type, title = '', metaData = {}, options = {
    template: '',
    width: '40%',
    show: false
  }, submitFn, cancelFn) {
    options.width = options.width || '40%'
    options.show = options.show || false
    options.template = options.template || ''

    this.template = options.template || `
      <dialog-modal :metaData="metaData" :submitFn="submitFn" :cancelFn="cancelFn" :options="options" :title="title">
      </dialog-modal>
      `
    const data = {
      title,
      metaData,
      options,
      cancelFn,
      submitFn
    }

    this.DialogModal = Vue.extend({
      template: this.template,
      data: () => data,
      components: {
        'dialog-modal': DialogModal[type]
      }
    })
    const modal = new this
      .DialogModal()
      .$mount()
    document
      .getElementById('app')
      .appendChild(modal.$el)
  }
}

const edit = new EditModal()
edit.install = (VUE) => {
  VUE.edit = edit
  if (edit.install.installed) {
    return
  }
  edit.install.installed = true
  Object.defineProperty(VUE.prototype, '$edit', {
    get: () => edit
  })
}

export default edit
