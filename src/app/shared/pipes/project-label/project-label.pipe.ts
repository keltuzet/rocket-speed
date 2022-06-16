import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '@stores/projects';

@Pipe({
  name: 'projectLabel',
})
export class ProjectLabelPipe implements PipeTransform {
  transform(project: Project): unknown {
    if (project.isIncoming) return 'Входящие';
    return ;
  }
}
