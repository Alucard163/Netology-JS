'use strict';

function handleTableClick(event) {
    if (event.target.tagName !== 'TH') {
        return;
      }
    
      const currTarget = event.target;
      const currName = currTarget.dataset.propName;
    
      table.dataset.sortBy = currName;
    
      if (currTarget.dataset.dir === undefined || currTarget.dataset.dir === '-1') {
        currTarget.dataset.dir = '1';
      } else {
        currTarget.dataset.dir = '-1';
      }
    
      sortTable(currName, currTarget.dataset.dir);
}
