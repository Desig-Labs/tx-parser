export type InterDao = {
  version: "0.1.0";
  name: "inter_dao";
  instructions: [
    {
      name: "initializeDao";
      accounts: [
        {
          name: "authority";
          isMut: true;
          isSigner: true;
        },
        {
          name: "dao";
          isMut: true;
          isSigner: true;
        },
        {
          name: "master";
          isMut: false;
          isSigner: false;
        },
        {
          name: "mint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "regime";
          type: {
            defined: "DaoRegime";
          };
        },
        {
          name: "supply";
          type: "u64";
        },
        {
          name: "metadata";
          type: {
            array: ["u8", 32];
          };
        },
        {
          name: "isNft";
          type: "bool";
        },
        {
          name: "isPublic";
          type: "bool";
        }
      ];
    },
    {
      name: "initializeProposal";
      accounts: [
        {
          name: "caller";
          isMut: true;
          isSigner: true;
        },
        {
          name: "proposal";
          isMut: true;
          isSigner: false;
        },
        {
          name: "dao";
          isMut: true;
          isSigner: false;
        },
        {
          name: "taxman";
          isMut: true;
          isSigner: false;
        },
        {
          name: "revenueman";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "consensusMechanism";
          type: {
            defined: "ConsensusMechanism";
          };
        },
        {
          name: "consesusQuorum";
          type: {
            defined: "ConsensusQuorum";
          };
        },
        {
          name: "startDate";
          type: "i64";
        },
        {
          name: "endDate";
          type: "i64";
        },
        {
          name: "metadata";
          type: {
            array: ["u8", 32];
          };
        },
        {
          name: "tax";
          type: "u64";
        },
        {
          name: "revenue";
          type: "u64";
        }
      ];
    },
    {
      name: "initializeProposalInstruction";
      accounts: [
        {
          name: "caller";
          isMut: true;
          isSigner: true;
        },
        {
          name: "proposalInstruction";
          isMut: true;
          isSigner: true;
        },
        {
          name: "invokedProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "proposal";
          isMut: true;
          isSigner: false;
        },
        {
          name: "dao";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "data";
          type: "bytes";
        },
        {
          name: "pubkeys";
          type: {
            vec: "publicKey";
          };
        },
        {
          name: "isSigners";
          type: {
            vec: "bool";
          };
        },
        {
          name: "isWritables";
          type: {
            vec: "bool";
          };
        },
        {
          name: "isMasters";
          type: {
            vec: "bool";
          };
        },
        {
          name: "txIdx";
          type: "u8";
        }
      ];
    },
    {
      name: "voteFor";
      accounts: [
        {
          name: "authority";
          isMut: true;
          isSigner: true;
        },
        {
          name: "src";
          isMut: true;
          isSigner: false;
        },
        {
          name: "treasurer";
          isMut: false;
          isSigner: false;
        },
        {
          name: "mint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "treasury";
          isMut: true;
          isSigner: false;
        },
        {
          name: "proposal";
          isMut: true;
          isSigner: false;
        },
        {
          name: "dao";
          isMut: false;
          isSigner: false;
        },
        {
          name: "receipt";
          isMut: true;
          isSigner: false;
        },
        {
          name: "taxman";
          isMut: true;
          isSigner: false;
        },
        {
          name: "revenueman";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "associatedTokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "index";
          type: "u64";
        },
        {
          name: "amount";
          type: "u64";
        },
        {
          name: "tax";
          type: "u64";
        },
        {
          name: "revenue";
          type: "u64";
        }
      ];
    },
    {
      name: "voteNftFor";
      accounts: [
        {
          name: "authority";
          isMut: true;
          isSigner: true;
        },
        {
          name: "src";
          isMut: true;
          isSigner: false;
        },
        {
          name: "treasurer";
          isMut: false;
          isSigner: false;
        },
        {
          name: "mint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "metadata";
          isMut: false;
          isSigner: false;
        },
        {
          name: "treasury";
          isMut: true;
          isSigner: false;
        },
        {
          name: "proposal";
          isMut: true;
          isSigner: false;
        },
        {
          name: "dao";
          isMut: true;
          isSigner: false;
        },
        {
          name: "receipt";
          isMut: true;
          isSigner: false;
        },
        {
          name: "taxman";
          isMut: true;
          isSigner: false;
        },
        {
          name: "revenueman";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "associatedTokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "index";
          type: "u64";
        },
        {
          name: "tax";
          type: "u64";
        },
        {
          name: "revenue";
          type: "u64";
        }
      ];
    },
    {
      name: "voteAgainst";
      accounts: [
        {
          name: "authority";
          isMut: true;
          isSigner: true;
        },
        {
          name: "src";
          isMut: true;
          isSigner: false;
        },
        {
          name: "treasurer";
          isMut: false;
          isSigner: false;
        },
        {
          name: "mint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "treasury";
          isMut: true;
          isSigner: false;
        },
        {
          name: "proposal";
          isMut: true;
          isSigner: false;
        },
        {
          name: "dao";
          isMut: false;
          isSigner: false;
        },
        {
          name: "receipt";
          isMut: true;
          isSigner: false;
        },
        {
          name: "taxman";
          isMut: true;
          isSigner: false;
        },
        {
          name: "revenueman";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "associatedTokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "index";
          type: "u64";
        },
        {
          name: "amount";
          type: "u64";
        },
        {
          name: "tax";
          type: "u64";
        },
        {
          name: "revenue";
          type: "u64";
        }
      ];
    },
    {
      name: "voteNftAgainst";
      accounts: [
        {
          name: "authority";
          isMut: true;
          isSigner: true;
        },
        {
          name: "src";
          isMut: true;
          isSigner: false;
        },
        {
          name: "treasurer";
          isMut: false;
          isSigner: false;
        },
        {
          name: "mint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "metadata";
          isMut: false;
          isSigner: false;
        },
        {
          name: "treasury";
          isMut: true;
          isSigner: false;
        },
        {
          name: "proposal";
          isMut: true;
          isSigner: false;
        },
        {
          name: "dao";
          isMut: true;
          isSigner: false;
        },
        {
          name: "receipt";
          isMut: true;
          isSigner: false;
        },
        {
          name: "taxman";
          isMut: true;
          isSigner: false;
        },
        {
          name: "revenueman";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "associatedTokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "index";
          type: "u64";
        },
        {
          name: "tax";
          type: "u64";
        },
        {
          name: "revenue";
          type: "u64";
        }
      ];
    },
    {
      name: "executeProposalInstruction";
      accounts: [
        {
          name: "caller";
          isMut: true;
          isSigner: true;
        },
        {
          name: "proposal";
          isMut: true;
          isSigner: false;
        },
        {
          name: "proposalInstruction";
          isMut: true;
          isSigner: false;
        },
        {
          name: "dao";
          isMut: false;
          isSigner: false;
        },
        {
          name: "master";
          isMut: false;
          isSigner: false;
        },
        {
          name: "invokedProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "close";
      accounts: [
        {
          name: "authority";
          isMut: true;
          isSigner: true;
        },
        {
          name: "dst";
          isMut: true;
          isSigner: false;
        },
        {
          name: "treasurer";
          isMut: false;
          isSigner: false;
        },
        {
          name: "mint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "treasury";
          isMut: true;
          isSigner: false;
        },
        {
          name: "proposal";
          isMut: true;
          isSigner: false;
        },
        {
          name: "dao";
          isMut: false;
          isSigner: false;
        },
        {
          name: "receipt";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "associatedTokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "closeNftVoting";
      accounts: [
        {
          name: "authority";
          isMut: true;
          isSigner: true;
        },
        {
          name: "dst";
          isMut: true;
          isSigner: false;
        },
        {
          name: "treasurer";
          isMut: false;
          isSigner: false;
        },
        {
          name: "mint";
          isMut: false;
          isSigner: false;
          docs: ["NFT mint"];
        },
        {
          name: "metadata";
          isMut: false;
          isSigner: false;
        },
        {
          name: "treasury";
          isMut: true;
          isSigner: false;
        },
        {
          name: "proposal";
          isMut: true;
          isSigner: false;
        },
        {
          name: "dao";
          isMut: true;
          isSigner: false;
        },
        {
          name: "receipt";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "associatedTokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "updateDaoRegime";
      accounts: [
        {
          name: "authority";
          isMut: true;
          isSigner: true;
        },
        {
          name: "dao";
          isMut: true;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "regime";
          type: {
            defined: "DaoRegime";
          };
        }
      ];
    },
    {
      name: "updateDaoMetadata";
      accounts: [
        {
          name: "authority";
          isMut: true;
          isSigner: true;
        },
        {
          name: "dao";
          isMut: true;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "metadata";
          type: {
            array: ["u8", 32];
          };
        }
      ];
    },
    {
      name: "updateSupply";
      accounts: [
        {
          name: "authority";
          isMut: true;
          isSigner: true;
        },
        {
          name: "dao";
          isMut: true;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "supply";
          type: "u64";
        }
      ];
    },
    {
      name: "transferAuthority";
      accounts: [
        {
          name: "authority";
          isMut: true;
          isSigner: true;
        },
        {
          name: "newAuthority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "dao";
          isMut: true;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "initializeContent";
      accounts: [
        {
          name: "authority";
          isMut: true;
          isSigner: true;
        },
        {
          name: "content";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "discriminator";
          type: {
            array: ["u8", 8];
          };
        },
        {
          name: "metadata";
          type: {
            array: ["u8", 32];
          };
        }
      ];
    }
  ];
  accounts: [
    {
      name: "content";
      type: {
        kind: "struct";
        fields: [
          {
            name: "authority";
            type: "publicKey";
          },
          {
            name: "discriminator";
            type: {
              array: ["u8", 8];
            };
          },
          {
            name: "metadata";
            type: {
              array: ["u8", 32];
            };
          }
        ];
      };
    },
    {
      name: "dao";
      type: {
        kind: "struct";
        fields: [
          {
            name: "master";
            type: "publicKey";
          },
          {
            name: "authority";
            type: "publicKey";
          },
          {
            name: "mint";
            type: "publicKey";
          },
          {
            name: "regime";
            type: {
              defined: "DaoRegime";
            };
          },
          {
            name: "supply";
            type: "u64";
          },
          {
            name: "nonce";
            type: "u64";
          },
          {
            name: "metadata";
            type: {
              array: ["u8", 32];
            };
          },
          {
            name: "isNft";
            type: "bool";
          },
          {
            name: "isPublic";
            type: "bool";
          }
        ];
      };
    },
    {
      name: "proposalInstruction";
      type: {
        kind: "struct";
        fields: [
          {
            name: "proposal";
            type: "publicKey";
          },
          {
            name: "index";
            type: "u8";
          },
          {
            name: "txIndex";
            type: "u8";
          },
          {
            name: "executed";
            type: "bool";
          },
          {
            name: "dataLen";
            type: "u64";
          },
          {
            name: "data";
            type: "bytes";
          },
          {
            name: "accountsLen";
            type: "u8";
          },
          {
            name: "accounts";
            type: {
              vec: {
                defined: "InvokedAccount";
              };
            };
          },
          {
            name: "invokedProgram";
            type: "publicKey";
          }
        ];
      };
    },
    {
      name: "proposal";
      type: {
        kind: "struct";
        fields: [
          {
            name: "index";
            type: "u64";
          },
          {
            name: "creator";
            type: "publicKey";
          },
          {
            name: "dao";
            type: "publicKey";
          },
          {
            name: "regime";
            type: {
              defined: "DaoRegime";
            };
          },
          {
            name: "consensusMechanism";
            type: {
              defined: "ConsensusMechanism";
            };
          },
          {
            name: "consensusQuorum";
            type: {
              defined: "ConsensusQuorum";
            };
          },
          {
            name: "totalInstruction";
            type: "u8";
          },
          {
            name: "totalExecuted";
            type: "u8";
          },
          {
            name: "executed";
            type: "bool";
          },
          {
            name: "votingForPower";
            type: "u128";
          },
          {
            name: "votingAgainstPower";
            type: "u128";
          },
          {
            name: "supply";
            type: "u64";
          },
          {
            name: "startDate";
            type: "i64";
          },
          {
            name: "endDate";
            type: "i64";
          },
          {
            name: "metadata";
            type: {
              array: ["u8", 32];
            };
          }
        ];
      };
    },
    {
      name: "receipt";
      type: {
        kind: "struct";
        fields: [
          {
            name: "index";
            type: "u64";
          },
          {
            name: "authority";
            type: "publicKey";
          },
          {
            name: "proposal";
            type: "publicKey";
          },
          {
            name: "mint";
            type: "publicKey";
          },
          {
            name: "amount";
            type: "u64";
          },
          {
            name: "power";
            type: "u128";
          },
          {
            name: "lockedDate";
            type: "i64";
          },
          {
            name: "unlockedDate";
            type: "i64";
          },
          {
            name: "action";
            type: {
              defined: "ReceiptAction";
            };
          }
        ];
      };
    }
  ];
  types: [
    {
      name: "InvokedAccount";
      type: {
        kind: "struct";
        fields: [
          {
            name: "pubkey";
            type: "publicKey";
          },
          {
            name: "isSigner";
            type: "bool";
          },
          {
            name: "isWritable";
            type: "bool";
          },
          {
            name: "isMaster";
            type: "bool";
          }
        ];
      };
    },
    {
      name: "DaoRegime";
      docs: ["", "DAO mechanism", ""];
      type: {
        kind: "enum";
        variants: [
          {
            name: "Dictatorial";
          },
          {
            name: "Democratic";
          },
          {
            name: "Autonomous";
          }
        ];
      };
    },
    {
      name: "ConsensusMechanism";
      docs: [
        "",
        "Consensus mechanism",
        "",
        "Staked Token Counter",
        "The voted power is counted by the number of staked tokens to the proposal.",
        "Voters can unstake anytime, but the voted power will be excluded.",
        "",
        "Locked Token Counter",
        "The voted power is counted by multiplication of the committed time and the number of locked tokens to the proposal.",
        "Voters can't unlock during the campaign.",
        ""
      ];
      type: {
        kind: "enum";
        variants: [
          {
            name: "StakedTokenCounter";
          },
          {
            name: "LockedTokenCounter";
          }
        ];
      };
    },
    {
      name: "ConsensusQuorum";
      docs: ["", "DAO quorum", ""];
      type: {
        kind: "enum";
        variants: [
          {
            name: "OneThird";
          },
          {
            name: "Half";
          },
          {
            name: "TwoThird";
          }
        ];
      };
    },
    {
      name: "ReceiptAction";
      docs: ["", "Receipt action", ""];
      type: {
        kind: "enum";
        variants: [
          {
            name: "VoteFor";
          },
          {
            name: "VoteAgainst";
          }
        ];
      };
    }
  ];
  events: [
    {
      name: "CloseEvent";
      fields: [
        {
          name: "authority";
          type: "publicKey";
          index: false;
        },
        {
          name: "receipt";
          type: "publicKey";
          index: false;
        },
        {
          name: "mint";
          type: "publicKey";
          index: false;
        },
        {
          name: "amount";
          type: "u64";
          index: false;
        }
      ];
    },
    {
      name: "CloseEvent";
      fields: [
        {
          name: "authority";
          type: "publicKey";
          index: false;
        },
        {
          name: "receipt";
          type: "publicKey";
          index: false;
        },
        {
          name: "mint";
          type: "publicKey";
          index: false;
        },
        {
          name: "amount";
          type: "u64";
          index: false;
        }
      ];
    },
    {
      name: "ExecuteProposalInstructionEvent";
      fields: [
        {
          name: "proposal";
          type: "publicKey";
          index: false;
        },
        {
          name: "caller";
          type: "publicKey";
          index: false;
        }
      ];
    },
    {
      name: "InitializeDAOEvent";
      fields: [
        {
          name: "dao";
          type: "publicKey";
          index: false;
        },
        {
          name: "authority";
          type: "publicKey";
          index: false;
        },
        {
          name: "mint";
          type: "publicKey";
          index: false;
        },
        {
          name: "regime";
          type: {
            defined: "DaoRegime";
          };
          index: false;
        },
        {
          name: "supply";
          type: "u64";
          index: false;
        },
        {
          name: "isNft";
          type: "bool";
          index: false;
        },
        {
          name: "isPublic";
          type: "bool";
          index: false;
        }
      ];
    },
    {
      name: "InitializeProposalInstructionEvent";
      fields: [
        {
          name: "proposal";
          type: "publicKey";
          index: false;
        },
        {
          name: "proposalInstruction";
          type: "publicKey";
          index: false;
        },
        {
          name: "dao";
          type: "publicKey";
          index: false;
        },
        {
          name: "caller";
          type: "publicKey";
          index: false;
        },
        {
          name: "invokedProgram";
          type: "publicKey";
          index: false;
        },
        {
          name: "data";
          type: "bytes";
          index: false;
        },
        {
          name: "accounts";
          type: {
            vec: {
              defined: "InvokedAccount";
            };
          };
          index: false;
        }
      ];
    },
    {
      name: "InitializeProposalEvent";
      fields: [
        {
          name: "proposal";
          type: "publicKey";
          index: false;
        },
        {
          name: "dao";
          type: "publicKey";
          index: false;
        },
        {
          name: "caller";
          type: "publicKey";
          index: false;
        },
        {
          name: "quorum";
          type: {
            defined: "ConsensusQuorum";
          };
          index: false;
        }
      ];
    },
    {
      name: "TransferAuthorityEvent";
      fields: [
        {
          name: "authority";
          type: "publicKey";
          index: false;
        },
        {
          name: "newAuthority";
          type: "publicKey";
          index: false;
        },
        {
          name: "dao";
          type: "publicKey";
          index: false;
        }
      ];
    },
    {
      name: "UpdateDaoMetadataEvent";
      fields: [
        {
          name: "dao";
          type: "publicKey";
          index: false;
        },
        {
          name: "metadata";
          type: {
            array: ["u8", 32];
          };
          index: false;
        }
      ];
    },
    {
      name: "UpdateDaoRegimeEvent";
      fields: [
        {
          name: "dao";
          type: "publicKey";
          index: false;
        },
        {
          name: "regime";
          type: {
            defined: "DaoRegime";
          };
          index: false;
        }
      ];
    },
    {
      name: "UpdateSupplyEvent";
      fields: [
        {
          name: "dao";
          type: "publicKey";
          index: false;
        },
        {
          name: "supply";
          type: "u64";
          index: false;
        }
      ];
    },
    {
      name: "VoteAgainstEvent";
      fields: [
        {
          name: "authority";
          type: "publicKey";
          index: false;
        },
        {
          name: "dao";
          type: "publicKey";
          index: false;
        },
        {
          name: "proposal";
          type: "publicKey";
          index: false;
        },
        {
          name: "receipt";
          type: "publicKey";
          index: false;
        },
        {
          name: "amount";
          type: "u64";
          index: false;
        }
      ];
    },
    {
      name: "VoteForEvent";
      fields: [
        {
          name: "authority";
          type: "publicKey";
          index: false;
        },
        {
          name: "dao";
          type: "publicKey";
          index: false;
        },
        {
          name: "proposal";
          type: "publicKey";
          index: false;
        },
        {
          name: "receipt";
          type: "publicKey";
          index: false;
        },
        {
          name: "amount";
          type: "u64";
          index: false;
        }
      ];
    },
    {
      name: "VoteAgainstEvent";
      fields: [
        {
          name: "authority";
          type: "publicKey";
          index: false;
        },
        {
          name: "dao";
          type: "publicKey";
          index: false;
        },
        {
          name: "proposal";
          type: "publicKey";
          index: false;
        },
        {
          name: "receipt";
          type: "publicKey";
          index: false;
        },
        {
          name: "amountNft";
          type: "u64";
          index: false;
        }
      ];
    },
    {
      name: "VoteForEvent";
      fields: [
        {
          name: "authority";
          type: "publicKey";
          index: false;
        },
        {
          name: "dao";
          type: "publicKey";
          index: false;
        },
        {
          name: "proposal";
          type: "publicKey";
          index: false;
        },
        {
          name: "receipt";
          type: "publicKey";
          index: false;
        },
        {
          name: "amountNft";
          type: "u64";
          index: false;
        }
      ];
    }
  ];
  errors: [
    {
      code: 6000;
      name: "Overflow";
      msg: "Operation overflowed";
    },
    {
      code: 6001;
      name: "InvalidDataLength";
      msg: "Invalid accounts length";
    },
    {
      code: 6002;
      name: "InconsistentProposal";
      msg: "Inconsistent proposal's accounts configuration";
    },
    {
      code: 6003;
      name: "NotConsentedProposal";
      msg: "The community isn't consenting on the proposal yet";
    },
    {
      code: 6004;
      name: "NotStartedProposal";
      msg: "The proposal isn't started yet";
    },
    {
      code: 6005;
      name: "NotEndedProposal";
      msg: "The proposal isn't ended yet";
    },
    {
      code: 6006;
      name: "StartedProposal";
      msg: "The proposal is started";
    },
    {
      code: 6007;
      name: "EndedProposal";
      msg: "The proposal had been ended";
    },
    {
      code: 6008;
      name: "ExecutedProposal";
      msg: "The proposal had been executed";
    },
    {
      code: 6009;
      name: "InvalidProposalIdx";
      msg: "Invalid proposal instruction index";
    },
    {
      code: 6010;
      name: "NoPermission";
      msg: "No permission";
    },
    {
      code: 6011;
      name: "NoBump";
      msg: "Cannot derive the program address";
    },
    {
      code: 6012;
      name: "InvalidCurrentDate";
      msg: "Cannot get current date";
    },
    {
      code: 6013;
      name: "InvalidStartDate";
      msg: "Start date need to be greater than or equal to current date";
    },
    {
      code: 6014;
      name: "InvalidEndDate";
      msg: "End date need to be greater than start date and current date";
    },
    {
      code: 6015;
      name: "InvalidNftCollection";
      msg: "Invalid NFT collection";
    }
  ];
};

export const IDL: InterDao = {
  version: "0.1.0",
  name: "inter_dao",
  instructions: [
    {
      name: "initializeDao",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "dao",
          isMut: true,
          isSigner: true,
        },
        {
          name: "master",
          isMut: false,
          isSigner: false,
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "regime",
          type: {
            defined: "DaoRegime",
          },
        },
        {
          name: "supply",
          type: "u64",
        },
        {
          name: "metadata",
          type: {
            array: ["u8", 32],
          },
        },
        {
          name: "isNft",
          type: "bool",
        },
        {
          name: "isPublic",
          type: "bool",
        },
      ],
    },
    {
      name: "initializeProposal",
      accounts: [
        {
          name: "caller",
          isMut: true,
          isSigner: true,
        },
        {
          name: "proposal",
          isMut: true,
          isSigner: false,
        },
        {
          name: "dao",
          isMut: true,
          isSigner: false,
        },
        {
          name: "taxman",
          isMut: true,
          isSigner: false,
        },
        {
          name: "revenueman",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "consensusMechanism",
          type: {
            defined: "ConsensusMechanism",
          },
        },
        {
          name: "consesusQuorum",
          type: {
            defined: "ConsensusQuorum",
          },
        },
        {
          name: "startDate",
          type: "i64",
        },
        {
          name: "endDate",
          type: "i64",
        },
        {
          name: "metadata",
          type: {
            array: ["u8", 32],
          },
        },
        {
          name: "tax",
          type: "u64",
        },
        {
          name: "revenue",
          type: "u64",
        },
      ],
    },
    {
      name: "initializeProposalInstruction",
      accounts: [
        {
          name: "caller",
          isMut: true,
          isSigner: true,
        },
        {
          name: "proposalInstruction",
          isMut: true,
          isSigner: true,
        },
        {
          name: "invokedProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "proposal",
          isMut: true,
          isSigner: false,
        },
        {
          name: "dao",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "data",
          type: "bytes",
        },
        {
          name: "pubkeys",
          type: {
            vec: "publicKey",
          },
        },
        {
          name: "isSigners",
          type: {
            vec: "bool",
          },
        },
        {
          name: "isWritables",
          type: {
            vec: "bool",
          },
        },
        {
          name: "isMasters",
          type: {
            vec: "bool",
          },
        },
        {
          name: "txIdx",
          type: "u8",
        },
      ],
    },
    {
      name: "voteFor",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "src",
          isMut: true,
          isSigner: false,
        },
        {
          name: "treasurer",
          isMut: false,
          isSigner: false,
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "treasury",
          isMut: true,
          isSigner: false,
        },
        {
          name: "proposal",
          isMut: true,
          isSigner: false,
        },
        {
          name: "dao",
          isMut: false,
          isSigner: false,
        },
        {
          name: "receipt",
          isMut: true,
          isSigner: false,
        },
        {
          name: "taxman",
          isMut: true,
          isSigner: false,
        },
        {
          name: "revenueman",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "index",
          type: "u64",
        },
        {
          name: "amount",
          type: "u64",
        },
        {
          name: "tax",
          type: "u64",
        },
        {
          name: "revenue",
          type: "u64",
        },
      ],
    },
    {
      name: "voteNftFor",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "src",
          isMut: true,
          isSigner: false,
        },
        {
          name: "treasurer",
          isMut: false,
          isSigner: false,
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "metadata",
          isMut: false,
          isSigner: false,
        },
        {
          name: "treasury",
          isMut: true,
          isSigner: false,
        },
        {
          name: "proposal",
          isMut: true,
          isSigner: false,
        },
        {
          name: "dao",
          isMut: true,
          isSigner: false,
        },
        {
          name: "receipt",
          isMut: true,
          isSigner: false,
        },
        {
          name: "taxman",
          isMut: true,
          isSigner: false,
        },
        {
          name: "revenueman",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "index",
          type: "u64",
        },
        {
          name: "tax",
          type: "u64",
        },
        {
          name: "revenue",
          type: "u64",
        },
      ],
    },
    {
      name: "voteAgainst",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "src",
          isMut: true,
          isSigner: false,
        },
        {
          name: "treasurer",
          isMut: false,
          isSigner: false,
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "treasury",
          isMut: true,
          isSigner: false,
        },
        {
          name: "proposal",
          isMut: true,
          isSigner: false,
        },
        {
          name: "dao",
          isMut: false,
          isSigner: false,
        },
        {
          name: "receipt",
          isMut: true,
          isSigner: false,
        },
        {
          name: "taxman",
          isMut: true,
          isSigner: false,
        },
        {
          name: "revenueman",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "index",
          type: "u64",
        },
        {
          name: "amount",
          type: "u64",
        },
        {
          name: "tax",
          type: "u64",
        },
        {
          name: "revenue",
          type: "u64",
        },
      ],
    },
    {
      name: "voteNftAgainst",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "src",
          isMut: true,
          isSigner: false,
        },
        {
          name: "treasurer",
          isMut: false,
          isSigner: false,
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "metadata",
          isMut: false,
          isSigner: false,
        },
        {
          name: "treasury",
          isMut: true,
          isSigner: false,
        },
        {
          name: "proposal",
          isMut: true,
          isSigner: false,
        },
        {
          name: "dao",
          isMut: true,
          isSigner: false,
        },
        {
          name: "receipt",
          isMut: true,
          isSigner: false,
        },
        {
          name: "taxman",
          isMut: true,
          isSigner: false,
        },
        {
          name: "revenueman",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "index",
          type: "u64",
        },
        {
          name: "tax",
          type: "u64",
        },
        {
          name: "revenue",
          type: "u64",
        },
      ],
    },
    {
      name: "executeProposalInstruction",
      accounts: [
        {
          name: "caller",
          isMut: true,
          isSigner: true,
        },
        {
          name: "proposal",
          isMut: true,
          isSigner: false,
        },
        {
          name: "proposalInstruction",
          isMut: true,
          isSigner: false,
        },
        {
          name: "dao",
          isMut: false,
          isSigner: false,
        },
        {
          name: "master",
          isMut: false,
          isSigner: false,
        },
        {
          name: "invokedProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "close",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "dst",
          isMut: true,
          isSigner: false,
        },
        {
          name: "treasurer",
          isMut: false,
          isSigner: false,
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "treasury",
          isMut: true,
          isSigner: false,
        },
        {
          name: "proposal",
          isMut: true,
          isSigner: false,
        },
        {
          name: "dao",
          isMut: false,
          isSigner: false,
        },
        {
          name: "receipt",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "closeNftVoting",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "dst",
          isMut: true,
          isSigner: false,
        },
        {
          name: "treasurer",
          isMut: false,
          isSigner: false,
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false,
          docs: ["NFT mint"],
        },
        {
          name: "metadata",
          isMut: false,
          isSigner: false,
        },
        {
          name: "treasury",
          isMut: true,
          isSigner: false,
        },
        {
          name: "proposal",
          isMut: true,
          isSigner: false,
        },
        {
          name: "dao",
          isMut: true,
          isSigner: false,
        },
        {
          name: "receipt",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "updateDaoRegime",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "dao",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "regime",
          type: {
            defined: "DaoRegime",
          },
        },
      ],
    },
    {
      name: "updateDaoMetadata",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "dao",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "metadata",
          type: {
            array: ["u8", 32],
          },
        },
      ],
    },
    {
      name: "updateSupply",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "dao",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "supply",
          type: "u64",
        },
      ],
    },
    {
      name: "transferAuthority",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "newAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "dao",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "initializeContent",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "content",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "discriminator",
          type: {
            array: ["u8", 8],
          },
        },
        {
          name: "metadata",
          type: {
            array: ["u8", 32],
          },
        },
      ],
    },
  ],
  accounts: [
    {
      name: "content",
      type: {
        kind: "struct",
        fields: [
          {
            name: "authority",
            type: "publicKey",
          },
          {
            name: "discriminator",
            type: {
              array: ["u8", 8],
            },
          },
          {
            name: "metadata",
            type: {
              array: ["u8", 32],
            },
          },
        ],
      },
    },
    {
      name: "dao",
      type: {
        kind: "struct",
        fields: [
          {
            name: "master",
            type: "publicKey",
          },
          {
            name: "authority",
            type: "publicKey",
          },
          {
            name: "mint",
            type: "publicKey",
          },
          {
            name: "regime",
            type: {
              defined: "DaoRegime",
            },
          },
          {
            name: "supply",
            type: "u64",
          },
          {
            name: "nonce",
            type: "u64",
          },
          {
            name: "metadata",
            type: {
              array: ["u8", 32],
            },
          },
          {
            name: "isNft",
            type: "bool",
          },
          {
            name: "isPublic",
            type: "bool",
          },
        ],
      },
    },
    {
      name: "proposalInstruction",
      type: {
        kind: "struct",
        fields: [
          {
            name: "proposal",
            type: "publicKey",
          },
          {
            name: "index",
            type: "u8",
          },
          {
            name: "txIndex",
            type: "u8",
          },
          {
            name: "executed",
            type: "bool",
          },
          {
            name: "dataLen",
            type: "u64",
          },
          {
            name: "data",
            type: "bytes",
          },
          {
            name: "accountsLen",
            type: "u8",
          },
          {
            name: "accounts",
            type: {
              vec: {
                defined: "InvokedAccount",
              },
            },
          },
          {
            name: "invokedProgram",
            type: "publicKey",
          },
        ],
      },
    },
    {
      name: "proposal",
      type: {
        kind: "struct",
        fields: [
          {
            name: "index",
            type: "u64",
          },
          {
            name: "creator",
            type: "publicKey",
          },
          {
            name: "dao",
            type: "publicKey",
          },
          {
            name: "regime",
            type: {
              defined: "DaoRegime",
            },
          },
          {
            name: "consensusMechanism",
            type: {
              defined: "ConsensusMechanism",
            },
          },
          {
            name: "consensusQuorum",
            type: {
              defined: "ConsensusQuorum",
            },
          },
          {
            name: "totalInstruction",
            type: "u8",
          },
          {
            name: "totalExecuted",
            type: "u8",
          },
          {
            name: "executed",
            type: "bool",
          },
          {
            name: "votingForPower",
            type: "u128",
          },
          {
            name: "votingAgainstPower",
            type: "u128",
          },
          {
            name: "supply",
            type: "u64",
          },
          {
            name: "startDate",
            type: "i64",
          },
          {
            name: "endDate",
            type: "i64",
          },
          {
            name: "metadata",
            type: {
              array: ["u8", 32],
            },
          },
        ],
      },
    },
    {
      name: "receipt",
      type: {
        kind: "struct",
        fields: [
          {
            name: "index",
            type: "u64",
          },
          {
            name: "authority",
            type: "publicKey",
          },
          {
            name: "proposal",
            type: "publicKey",
          },
          {
            name: "mint",
            type: "publicKey",
          },
          {
            name: "amount",
            type: "u64",
          },
          {
            name: "power",
            type: "u128",
          },
          {
            name: "lockedDate",
            type: "i64",
          },
          {
            name: "unlockedDate",
            type: "i64",
          },
          {
            name: "action",
            type: {
              defined: "ReceiptAction",
            },
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "InvokedAccount",
      type: {
        kind: "struct",
        fields: [
          {
            name: "pubkey",
            type: "publicKey",
          },
          {
            name: "isSigner",
            type: "bool",
          },
          {
            name: "isWritable",
            type: "bool",
          },
          {
            name: "isMaster",
            type: "bool",
          },
        ],
      },
    },
    {
      name: "DaoRegime",
      docs: ["", "DAO mechanism", ""],
      type: {
        kind: "enum",
        variants: [
          {
            name: "Dictatorial",
          },
          {
            name: "Democratic",
          },
          {
            name: "Autonomous",
          },
        ],
      },
    },
    {
      name: "ConsensusMechanism",
      docs: [
        "",
        "Consensus mechanism",
        "",
        "Staked Token Counter",
        "The voted power is counted by the number of staked tokens to the proposal.",
        "Voters can unstake anytime, but the voted power will be excluded.",
        "",
        "Locked Token Counter",
        "The voted power is counted by multiplication of the committed time and the number of locked tokens to the proposal.",
        "Voters can't unlock during the campaign.",
        "",
      ],
      type: {
        kind: "enum",
        variants: [
          {
            name: "StakedTokenCounter",
          },
          {
            name: "LockedTokenCounter",
          },
        ],
      },
    },
    {
      name: "ConsensusQuorum",
      docs: ["", "DAO quorum", ""],
      type: {
        kind: "enum",
        variants: [
          {
            name: "OneThird",
          },
          {
            name: "Half",
          },
          {
            name: "TwoThird",
          },
        ],
      },
    },
    {
      name: "ReceiptAction",
      docs: ["", "Receipt action", ""],
      type: {
        kind: "enum",
        variants: [
          {
            name: "VoteFor",
          },
          {
            name: "VoteAgainst",
          },
        ],
      },
    },
  ],
  events: [
    {
      name: "CloseEvent",
      fields: [
        {
          name: "authority",
          type: "publicKey",
          index: false,
        },
        {
          name: "receipt",
          type: "publicKey",
          index: false,
        },
        {
          name: "mint",
          type: "publicKey",
          index: false,
        },
        {
          name: "amount",
          type: "u64",
          index: false,
        },
      ],
    },
    {
      name: "CloseEvent",
      fields: [
        {
          name: "authority",
          type: "publicKey",
          index: false,
        },
        {
          name: "receipt",
          type: "publicKey",
          index: false,
        },
        {
          name: "mint",
          type: "publicKey",
          index: false,
        },
        {
          name: "amount",
          type: "u64",
          index: false,
        },
      ],
    },
    {
      name: "ExecuteProposalInstructionEvent",
      fields: [
        {
          name: "proposal",
          type: "publicKey",
          index: false,
        },
        {
          name: "caller",
          type: "publicKey",
          index: false,
        },
      ],
    },
    {
      name: "InitializeDAOEvent",
      fields: [
        {
          name: "dao",
          type: "publicKey",
          index: false,
        },
        {
          name: "authority",
          type: "publicKey",
          index: false,
        },
        {
          name: "mint",
          type: "publicKey",
          index: false,
        },
        {
          name: "regime",
          type: {
            defined: "DaoRegime",
          },
          index: false,
        },
        {
          name: "supply",
          type: "u64",
          index: false,
        },
        {
          name: "isNft",
          type: "bool",
          index: false,
        },
        {
          name: "isPublic",
          type: "bool",
          index: false,
        },
      ],
    },
    {
      name: "InitializeProposalInstructionEvent",
      fields: [
        {
          name: "proposal",
          type: "publicKey",
          index: false,
        },
        {
          name: "proposalInstruction",
          type: "publicKey",
          index: false,
        },
        {
          name: "dao",
          type: "publicKey",
          index: false,
        },
        {
          name: "caller",
          type: "publicKey",
          index: false,
        },
        {
          name: "invokedProgram",
          type: "publicKey",
          index: false,
        },
        {
          name: "data",
          type: "bytes",
          index: false,
        },
        {
          name: "accounts",
          type: {
            vec: {
              defined: "InvokedAccount",
            },
          },
          index: false,
        },
      ],
    },
    {
      name: "InitializeProposalEvent",
      fields: [
        {
          name: "proposal",
          type: "publicKey",
          index: false,
        },
        {
          name: "dao",
          type: "publicKey",
          index: false,
        },
        {
          name: "caller",
          type: "publicKey",
          index: false,
        },
        {
          name: "quorum",
          type: {
            defined: "ConsensusQuorum",
          },
          index: false,
        },
      ],
    },
    {
      name: "TransferAuthorityEvent",
      fields: [
        {
          name: "authority",
          type: "publicKey",
          index: false,
        },
        {
          name: "newAuthority",
          type: "publicKey",
          index: false,
        },
        {
          name: "dao",
          type: "publicKey",
          index: false,
        },
      ],
    },
    {
      name: "UpdateDaoMetadataEvent",
      fields: [
        {
          name: "dao",
          type: "publicKey",
          index: false,
        },
        {
          name: "metadata",
          type: {
            array: ["u8", 32],
          },
          index: false,
        },
      ],
    },
    {
      name: "UpdateDaoRegimeEvent",
      fields: [
        {
          name: "dao",
          type: "publicKey",
          index: false,
        },
        {
          name: "regime",
          type: {
            defined: "DaoRegime",
          },
          index: false,
        },
      ],
    },
    {
      name: "UpdateSupplyEvent",
      fields: [
        {
          name: "dao",
          type: "publicKey",
          index: false,
        },
        {
          name: "supply",
          type: "u64",
          index: false,
        },
      ],
    },
    {
      name: "VoteAgainstEvent",
      fields: [
        {
          name: "authority",
          type: "publicKey",
          index: false,
        },
        {
          name: "dao",
          type: "publicKey",
          index: false,
        },
        {
          name: "proposal",
          type: "publicKey",
          index: false,
        },
        {
          name: "receipt",
          type: "publicKey",
          index: false,
        },
        {
          name: "amount",
          type: "u64",
          index: false,
        },
      ],
    },
    {
      name: "VoteForEvent",
      fields: [
        {
          name: "authority",
          type: "publicKey",
          index: false,
        },
        {
          name: "dao",
          type: "publicKey",
          index: false,
        },
        {
          name: "proposal",
          type: "publicKey",
          index: false,
        },
        {
          name: "receipt",
          type: "publicKey",
          index: false,
        },
        {
          name: "amount",
          type: "u64",
          index: false,
        },
      ],
    },
    {
      name: "VoteAgainstEvent",
      fields: [
        {
          name: "authority",
          type: "publicKey",
          index: false,
        },
        {
          name: "dao",
          type: "publicKey",
          index: false,
        },
        {
          name: "proposal",
          type: "publicKey",
          index: false,
        },
        {
          name: "receipt",
          type: "publicKey",
          index: false,
        },
        {
          name: "amountNft",
          type: "u64",
          index: false,
        },
      ],
    },
    {
      name: "VoteForEvent",
      fields: [
        {
          name: "authority",
          type: "publicKey",
          index: false,
        },
        {
          name: "dao",
          type: "publicKey",
          index: false,
        },
        {
          name: "proposal",
          type: "publicKey",
          index: false,
        },
        {
          name: "receipt",
          type: "publicKey",
          index: false,
        },
        {
          name: "amountNft",
          type: "u64",
          index: false,
        },
      ],
    },
  ],
  errors: [
    {
      code: 6000,
      name: "Overflow",
      msg: "Operation overflowed",
    },
    {
      code: 6001,
      name: "InvalidDataLength",
      msg: "Invalid accounts length",
    },
    {
      code: 6002,
      name: "InconsistentProposal",
      msg: "Inconsistent proposal's accounts configuration",
    },
    {
      code: 6003,
      name: "NotConsentedProposal",
      msg: "The community isn't consenting on the proposal yet",
    },
    {
      code: 6004,
      name: "NotStartedProposal",
      msg: "The proposal isn't started yet",
    },
    {
      code: 6005,
      name: "NotEndedProposal",
      msg: "The proposal isn't ended yet",
    },
    {
      code: 6006,
      name: "StartedProposal",
      msg: "The proposal is started",
    },
    {
      code: 6007,
      name: "EndedProposal",
      msg: "The proposal had been ended",
    },
    {
      code: 6008,
      name: "ExecutedProposal",
      msg: "The proposal had been executed",
    },
    {
      code: 6009,
      name: "InvalidProposalIdx",
      msg: "Invalid proposal instruction index",
    },
    {
      code: 6010,
      name: "NoPermission",
      msg: "No permission",
    },
    {
      code: 6011,
      name: "NoBump",
      msg: "Cannot derive the program address",
    },
    {
      code: 6012,
      name: "InvalidCurrentDate",
      msg: "Cannot get current date",
    },
    {
      code: 6013,
      name: "InvalidStartDate",
      msg: "Start date need to be greater than or equal to current date",
    },
    {
      code: 6014,
      name: "InvalidEndDate",
      msg: "End date need to be greater than start date and current date",
    },
    {
      code: 6015,
      name: "InvalidNftCollection",
      msg: "Invalid NFT collection",
    },
  ],
};
