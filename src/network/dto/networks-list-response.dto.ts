import { Network } from '../entities/network.entity';

export class NetworksListResponseDto {
  my = [];
  others = [];
  constructor(networks: Network[], myId: string) {
    networks.forEach((net) => {
      if (net.user.id === myId) {
        this.my.push(net);
      } else {
        this.others.push(net);
      }
    });
  }
}
