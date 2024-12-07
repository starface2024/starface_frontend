// import Home from '@/modules/App/Index.vue'
import Claim from '@/modules/App/Claim.vue'
import Upgrade from '@/modules/App/Upgrade.vue'
import Profile from '@/modules/App/Profile.vue'
import Chat from '@/modules/App/Chat.vue'
import Connect from '@/modules/App/Connect.vue'
import User from '@/modules/App/User.vue'
import Create from '@/modules/App/Create.vue'
import Wallet from '@/modules/App/Wallet.vue'
import ChatArea from '@/modules/App/chat/chatArea.vue'
import Invite from '@/modules/App/Invite.vue'
import Edit from '@/modules/App/profile/Edit.vue'
import BecomeACreator from '@/modules/App/profile/BecomeACreator.vue'
import Reels from '@/modules/App/Reels.vue'

const routes = [
  {
    path: '/feeds',
    name: 'feeds',
    // component: Home,
    component: Reels,
    meta: {
      layout: 'Dashboard',
      requiresAuth: false,
      parent: 'feeds',
      name: 'feeds'
    }
  },

  {
    path: '/claim',
    name: 'app-claim',
    component: Claim,
    meta: {
      layout: 'Dashboard',
      requiresAuth: false,
      parent: 'home',
      name: 'claims'
    }
  },

  {
    path: '/chat',
    name: 'chat',
    component: Chat,
    meta: {
      layout: 'Dashboard',
      requiresAuth: true,
      parent: 'chat',
      name: 'chat'
    }
  },

  {
    path: '/chat/message/:id',
    name: 'app-chat-details',
    component: ChatArea,
    meta: {
      layout: '',
      requiresAuth: true,
      parent: 'chat',
      name: 'chat'
    }
  },


  {
    path: '/',
    name: 'connect',
    component: Connect,
    meta: {
      layout: 'Dashboard',
      requiresAuth: false,
      parent: 'connect',
      name: 'connect'
    }
  },

  {
    path: '/user/profile/:id',
    name: 'app-user-profile',
    component: User,
    meta: {
      layout: 'Dashboard',
      requiresAuth: false,
      parent: 'connect',
      name: 'connect-profile'
    }
  },


  {
    path: '/profile/edit',
    name: 'edit-profile',
    component: Edit,
    meta: {
      layout: 'Dashboard',
      requiresAuth: false,
      parent: 'profile',
      name: 'edit-profile'
    }
  },


  {
    path: '/upgrade',
    name: 'app-upgrade',
    component: Upgrade,
    meta: {
      layout: 'Dashboard',
      requiresAuth: false,
      parent: 'profile',
      name: 'upgrade'
    }
  },

  {
    path: '/become-a-creator',
    name: 'become-a-creator',
    component: BecomeACreator,
    meta: {
      layout: 'Dashboard',
      requiresAuth: false,
      parent: 'profile',
      name: 'become-a-creator'
    }
  },

  {
    path: '/invite',
    name: 'app-invite',
    component: Invite,
    meta: {
      layout: 'Dashboard',
      requiresAuth: true,
      parent: 'invite',
      name: 'invite'
    }
  },

  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: {
      layout: 'Dashboard',
      requiresAuth: true,
      parent: 'profile',
      name: 'edit-profile'
    }
  },

  {
    path: '/create',
    name: 'app-create',
    component: Create,
    meta: {
      layout: 'Dashboard',
      requiresAuth: false,
      parent: 'create',
      name: 'create'
    }
  },

  {
    path: '/wallet',
    name: 'app-wallet',
    component: Wallet,
    meta: {
      layout: 'Dashboard',
      requiresAuth: true,
      parent: 'wallet',
      name: 'wallet'
    }
  }
]

export default routes
