import { Guild, Message, OmitPartialGroupDMChannel } from "discord.js";

type IPermissionService = OmitPartialGroupDMChannel<Message<boolean>>;

class AdminPermission {
  private readonly ADMIN_ROLE_NAMES = [
    "🍊 Suco de Laranja",
    "admin",
    "administrator",
    "administrador",
    "mod",
    "moderador",
    "staff",
  ];

  public async hasPermission(data: IPermissionService): Promise<boolean> {
    const hasAdminPermission =
      data.member?.permissions.has("Administrator") ?? false;

    if (hasAdminPermission) {
      return true;
    }

    const guild = data.guild;
    if (!guild) {
      return false;
    }

    const hasAdminRoles = this.checkAdminRolesExist(guild);
    if (!hasAdminRoles) {
      return false;
    }

    return this.checkUserHasAdminRole(guild, data.author.id);
  }

  private checkAdminRolesExist(guild: Guild): boolean {
    return this.ADMIN_ROLE_NAMES.some((roleName) =>
      guild.roles.cache.find((role) => role.name.toLowerCase() === roleName),
    );
  }

  private async checkUserHasAdminRole(
    guild: Guild,
    userId: string,
  ): Promise<boolean> {
    const user = await guild.members.fetch(userId);
    const adminRoles = user?.roles.cache.filter((role) =>
      this.ADMIN_ROLE_NAMES.includes(role.name.toLowerCase()),
    );

    return adminRoles?.size > 0;
  }
}

export const adminPermission = new AdminPermission();
