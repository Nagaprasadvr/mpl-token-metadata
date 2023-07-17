/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  AccountMeta,
  Context,
  Pda,
  PublicKey,
  Signer,
  TransactionBuilder,
  publicKey,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  mapSerializer,
  struct,
  u8,
} from '@metaplex-foundation/umi/serializers';
import { findMetadataPda } from '../accounts';
import { addAccountMeta, addObjectProperty } from '../shared';

// Accounts.
export type SetTokenStandardInstructionAccounts = {
  /** Metadata account */
  metadata?: PublicKey | Pda;
  /** Metadata update authority */
  updateAuthority?: Signer;
  /** Mint account */
  mint: PublicKey | Pda;
  /** Edition account */
  edition?: PublicKey | Pda;
};

// Data.
export type SetTokenStandardInstructionData = { discriminator: number };

export type SetTokenStandardInstructionDataArgs = {};

/** @deprecated Use `getSetTokenStandardInstructionDataSerializer()` without any argument instead. */
export function getSetTokenStandardInstructionDataSerializer(
  _context: object
): Serializer<
  SetTokenStandardInstructionDataArgs,
  SetTokenStandardInstructionData
>;
export function getSetTokenStandardInstructionDataSerializer(): Serializer<
  SetTokenStandardInstructionDataArgs,
  SetTokenStandardInstructionData
>;
export function getSetTokenStandardInstructionDataSerializer(
  _context: object = {}
): Serializer<
  SetTokenStandardInstructionDataArgs,
  SetTokenStandardInstructionData
> {
  return mapSerializer<
    SetTokenStandardInstructionDataArgs,
    any,
    SetTokenStandardInstructionData
  >(
    struct<SetTokenStandardInstructionData>([['discriminator', u8()]], {
      description: 'SetTokenStandardInstructionData',
    }),
    (value) => ({ ...value, discriminator: 35 })
  ) as Serializer<
    SetTokenStandardInstructionDataArgs,
    SetTokenStandardInstructionData
  >;
}

// Instruction.
export function setTokenStandard(
  context: Pick<Context, 'programs' | 'eddsa' | 'identity'>,
  input: SetTokenStandardInstructionAccounts
): TransactionBuilder {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId = context.programs.getPublicKey(
    'mplTokenMetadata',
    'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
  );

  // Resolved inputs.
  const resolvedAccounts = {
    mint: [input.mint, false] as const,
    edition: [input.edition, false] as const,
  };
  addObjectProperty(
    resolvedAccounts,
    'metadata',
    input.metadata
      ? ([input.metadata, true] as const)
      : ([
          findMetadataPda(context, { mint: publicKey(input.mint, false) }),
          true,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'updateAuthority',
    input.updateAuthority
      ? ([input.updateAuthority, false] as const)
      : ([context.identity, false] as const)
  );

  addAccountMeta(keys, signers, resolvedAccounts.metadata, false);
  addAccountMeta(keys, signers, resolvedAccounts.updateAuthority, false);
  addAccountMeta(keys, signers, resolvedAccounts.mint, false);
  addAccountMeta(keys, signers, resolvedAccounts.edition, true);

  // Data.
  const data = getSetTokenStandardInstructionDataSerializer().serialize({});

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
