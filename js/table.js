const generateHeaderRow = (headings) => {
  let rowCode = '<tr>';
  headings.forEach(heading => {
    rowCode += `<th>${heading}</th>`;
  });
  rowCode += '</tr>';
  return rowCode;
};

const generateRow = (session, num) => {
  const classAttr = (num % 2 === 0) ? ' class="grayBg"' : '';
  return `<tr${classAttr}><td>${num}</td><td>${session}</td></tr>`
};
