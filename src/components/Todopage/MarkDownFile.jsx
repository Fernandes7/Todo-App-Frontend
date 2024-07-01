import { saveAs } from 'file-saver';

const generateMarkdownContent = (projectname, todos) => {
    const totalTodos = todos.length;
    const completedTodos = todos.filter(todo => todo.status=="Complete").length;
    const pendingTodos = todos.filter(todo => !todo.status!="Complete");
    const completedTodosList = todos.filter(todo => todo.status=="Complete");
  
    let content = `# ${projectname}\n\n`;
    content += `Summary: ${completedTodos} / ${totalTodos} completed.\n\n`;
    content += `## Pending Tasks\n`;
    pendingTodos.forEach(todo => {
      content += `- [ ] ${todo.taskname}\n`;
    });
    content += `\n## Completed Tasks\n`;
    completedTodosList.forEach(todo => {
      content += `- [x] ${todo.taskname}\n`;
    });
  
    return content;
  };
  
  const downloadMarkdownFile = (projectname, todos) => {
    const content = generateMarkdownContent(projectname, todos);
    const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
    saveAs(blob, `${projectname}.md`);
  };

  export {downloadMarkdownFile}