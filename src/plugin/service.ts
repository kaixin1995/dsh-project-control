/**
 * Project Control core service definition and registration.
 * @module dsh-project-control/plugin/service
 */

import { Context, Service } from '@deepseek-ai/cordis'
import z from '@deepseek-ai/schemastery'

declare module '@deepseek-ai/cordis' {
  interface Context {
    projectControl: ProjectControlService
  }
}

export interface ProjectControlConfig {
  enabled?: boolean
}

export class ProjectControlService extends Service {
  static inject = []
  static Config: z<ProjectControlConfig> = z.object({
    enabled: z.boolean().default(true),
  })

  constructor(ctx: Context, public config: ProjectControlConfig = {}) {
    super(ctx, 'projectControl')
    ctx.logger.info('ProjectControlService mounted successfully')
  }
}

export default ProjectControlService
