import { NextRouter } from 'next/router';
import React from 'react';

export class UnsavedChanges {
  private static _instance: UnsavedChanges;
  private router: NextRouter;
  private path = null;
  private isTerminated = false;
  private message =
    'You have unsaved changes - are you sure you wish to leave this page?';
  constructor(message: string, router: NextRouter) {
    this.message = message;
    this.router = router;
  }

  // public static get Instance()
  // {
  //     // Do you need arguments? Make it a regular static method instead.
  //     return this._instance || (this._instance = new this());
  // }

  push(path: string) {
    console.log('pushed ', this);

    this.path = path;
  }
  hook(predicateCallback) {
    console.log('this hook', this);

    // ignore call back when path is set
    // this is when navigation occurs
    if (this.path !== null && this.isTerminated == false) {
      console.log('start navigating', this);

      this.router.push(this.path);
      // set isTerminated to null after navigating, so that this push function is call once
      this.isTerminated = true;
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      console.log('useEffect is running', this);

      const handleWindowClose = (e: BeforeUnloadEvent) => {
        if (this.isTerminated == true) return;
        if (predicateCallback && !predicateCallback()) return;
        console.log('handleWindowClose this', this);

        e.preventDefault();
        return (e.returnValue = this.message);
      };
      const handleBrowseAway = () => {
        if (this.isTerminated == true) return;
        if (predicateCallback && !predicateCallback()) return;
        console.log('handleBrowseAway this', this);

        if (window.confirm(this.message)) return;
        this.router.events.emit('routeChangeError');
        // push state, because browser back action changes link and changes history state
        // but we stay on the same page
        if (this.router.asPath !== window.location.pathname) {
          window.history.pushState('', '', this.router.asPath);
        }
        throw 'routeChange aborted.';
      };
      window.addEventListener('beforeunload', handleWindowClose);
      this.router.events.on('routeChangeStart', handleBrowseAway);
      return () => {
        window.removeEventListener('beforeunload', handleWindowClose);
        this.router.events.off('routeChangeStart', handleBrowseAway);
      };
    });
  }
  startService() {}
  endService() {}
}
