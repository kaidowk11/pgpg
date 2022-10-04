'use babel';

import PgpgView from './pgpg-view';
import { CompositeDisposable } from 'atom';

export default {

  pgpgView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.pgpgView = new PgpgView(state.pgpgViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.pgpgView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'pgpg:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.pgpgView.destroy();
  },

  serialize() {
    return {
      pgpgViewState: this.pgpgView.serialize()
    };
  },

  toggle() {
    console.log('Pgpg was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
